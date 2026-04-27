import app from "./app"
import { startTracing } from "./tracing/tracing"

const startServer = async () => {
    await startTracing()

    app.listen(3000, () => {
        console.log('server started on port 3000')
    })
}

startServer();

