import handle from "../server/vercel-handler.mjs";

export default { fetch: (request) => handle(request, "submit") };
