//Node Life Cycle
//1.Client send http request.
//2.Server receives http request.
//3.Event loop register request.
//4.If req is sync: then added in callStack.
//5.If req is async: then it sended to OS, thread pool.
//6.Operation completed.
//7.Callback added to queue.
//8.Event loop pick it up.
//9.Execute callback.
//10.Send response to client.