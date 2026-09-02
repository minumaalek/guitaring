"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { productSchema } from "@/lib/validations";

export async function addProductToCart(productId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }
  const cart = await db.cart.upsert({
    where: {
      userId: session.user.id,
    },
    create: {
      userId: session.user.id,
    },
    update: {},
  });

  await db.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    create: {
      cartId: cart.id,
      productId,
    },
    update: {},
  });

  return {
    success: true,
  };
}

export async function createProduct(formData: FormData) {
  try {
    const admin = await requireAdmin();

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const slug = formData.get("slug")?.toString();
    const content = formData.get("content")?.toString();

    const originalPrice = Number(formData.get("originalPrice"));
    const newPrice = Number(formData.get("newPrice"));
    const categoryId = Number(formData.get("categoryId"));

    if (!title || !description || !slug || !content) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        parent: true,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found.",
      };
    }

    const route = category.parent
      ? `/products/${category.parent.slug}/${category.slug}/${slug}`
      : `/products/${category.slug}/${slug}`;

    const existingProduct = await db.product.findFirst({
      where: {
        OR: [{ slug }, { route }],
      },
    });

    if (existingProduct) {
      return {
        success: false,
        message: "A product with this slug or route already exists.",
      };
    }

    const product = await db.product.create({
      data: {
        title,
        description,
        slug,
        route,
        content,
        originalPrice,
        newPrice,
        categoryId,
        adminId: admin.id,
      },
    });

    revalidatePath("/account/products");

    return {
      success: true,
      message: "Product created successfully.",
      product,
    };
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while creating the product.",
    };
  }
}
export async function deleteProduct(productId: number) {
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to delete product",
    };
  }
}

export async function editProduct(productId: number, formData: FormData) {
  try {
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      slug: formData.get("slug"),
      content: formData.get("content"),
    };

    const result = productSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      };
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    const { slug } = result.data;

    const route = product.category.parent
      ? `/products/${product.category.parent.slug}/${product.category.slug}/${slug}`
      : `/products/${product.category.slug}/${slug}`;

    const existingProduct = await db.product.findFirst({
      where: {
        OR: [{ slug }, { route }],
        NOT: {
          id: productId,
        },
      },
    });

    if (existingProduct) {
      return {
        success: false,
        message: "A product with this slug or route already exists.",
      };
    }

    const updatedProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...result.data,
        route,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      product: updatedProduct,
    };
  } catch (error) {
    console.error("EDIT PRODUCT ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while editing the product.",
    };
  }
}
