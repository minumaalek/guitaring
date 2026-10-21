import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Guitaring recommendation API is reachable",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { skill_level, budget, guitar_type } = body;

    if (
      !["beginner", "intermediate", "advanced"].includes(skill_level) ||
      typeof budget !== "number" ||
      !Number.isFinite(budget) ||
      budget <= 0
    ) {
      return NextResponse.json(
        { error: "Invalid recommendation preferences." },
        { status: 400 },
      );
    }

    const [products, courses] = await Promise.all([
      db.product.findMany({
        select: {
          id: true,
          title: true,
          newPrice: true,
          description: true,
          route: true,
          category: {
            select: {
              name: true,
              slug: true,
              parent: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      }),
      db.course.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          newPrice: true,
          description: true,
        },
      }),
    ]);

    const preparedProducts = products.map((product) => {
      const parts = product.route?.split("/").filter(Boolean) ?? [];

      const isGuitar = parts[0] === "products" && parts[1] === "guitar";

      return {
        id: product.id,
        title: product.title,
        price: product.newPrice,
        description: product.description ?? "",

        category: product.category.name,
        category_slug: product.category.slug,
        parent_category: product.category.parent?.name ?? null,

        guitar_type: isGuitar ? (parts[2] ?? null) : null,
      };
    });

    const response = await fetch(
      `${process.env.RECOMMENDATION_API_URL}/recommend`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill_level,
          budget,
          guitar_type: guitar_type ?? null,
          products: preparedProducts,
          courses: courses.map((course) => ({
            id: course.id,
            title: course.title,
            price: course.newPrice,
            description: course.description,
          })),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "The recommendation service failed." },
        { status: 502 },
      );
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Recommendation API error:", error);

    return NextResponse.json(
      { error: "Unable to generate recommendations." },
      { status: 500 },
    );
  }
}
