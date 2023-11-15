export class ResponseHandler {
    public _500(message?: string) {
        return Response.json(
            { ok: false, message: message ?? 'Internal service error' },
            { status: 500 }
        )
    }

    public _404(message?: string) {
        return Response.json(
            { ok: false, message: message ?? 'Not found' },
            {
                status: 404,
            }
        )
    }

    public _403(message?: string) {
        return Response.json(
            { ok: false, message: message ?? 'Access denied' },
            {
                status: 403,
            }
        )
    }

    public _401(message?: string) {
        return Response.json(
            { ok: false, message: message ?? 'Invalid credentials' },
            {
                status: 401,
            }
        )
    }

    public _400(message?: string) {
        return Response.json(
            { ok: false, message: message ?? 'Bad request' },
            {
                status: 400,
            }
        )
    }

    public _200(body?: Record<string, any>) {
        return Response.json(
            { ok: true, ...body },
            {
                status: 200,
            }
        )
    }
}
