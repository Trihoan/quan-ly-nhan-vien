type GraphQLError = { message: string };
type GraphQLResponse<TData> = {
    data?: TData;
    errors?: GraphQLError[];
};

export async function graphqlRequest<TData>(
    query: string,
    variables?: Record<string, unknown>
): Promise<TData> {
    const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables })
    });

    const result = (await response.json()) as GraphQLResponse<TData>;
    const errorMessage = result.errors?.[0]?.message;

    if (!response.ok || errorMessage) {
        throw new Error(errorMessage || `GraphQL trả về HTTP ${response.status}.`);
    }

    if (!result.data) {
        throw new Error("GraphQL không trả về dữ liệu.");
    }

    return result.data;
}
