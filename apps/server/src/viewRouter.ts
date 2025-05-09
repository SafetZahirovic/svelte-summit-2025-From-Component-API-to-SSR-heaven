import type { FastifyInstance } from "fastify";
import {
    type ZodTypeProvider
} from "fastify-type-provider-zod";
import "pino-pretty";
import { z } from "zod";
import { createDom, renderSvelteView } from "./utils.ts";


export function viewsRouter(fastify: FastifyInstance) {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/",
        schema: {
            response: {
                200: z.string()
            },
            querystring: z.object({
                name: z.string().optional(),
            })
        },
        handler: async (request, reply) => {
            const { name } = request.query
            const { body, hydrate } = await renderSvelteView({ name: "home", props: { name } });
            const dom = createDom({ body, hydrate, props: { name } });

            await reply.type("text/html").send(dom);
        },

    })
}
