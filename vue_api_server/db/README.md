dbeaver 导入sql数据失败

> C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe -u root --host=localhost --port=3306 test-s
> Task 'MySQL script' started at Sun Dec 19 15:48:07 GMT+08:00 2021
> ERROR 1366 (HY000) at line 37: Incorrect string value: '\xA7\x82\xE5\x8F\x82\xE6...' for column 'attr_name' at row 1
>
> Task 'MySQL script' finished at Sun Dec 19 15:48:08 GMT+08:00 2021
> 2021-12-19 15:48:08.838 - IO error: Process failed (exit code = 1). See error log.
> 2021-12-19 15:48:08.838 - java.io.IOException: Process failed (exit code = 1). See error log.
> 	at org.jkiss.dbeaver.tasks.nativetool.AbstractNativeToolHandler.validateErrorCode(AbstractNativeToolHandler.java:214)
> 	at org.jkiss.dbeaver.tasks.nativetool.AbstractNativeToolHandler.executeProcess(AbstractNativeToolHandler.java:194)
> 	at org.jkiss.dbeaver.tasks.nativetool.AbstractNativeToolHandler.doExecute(AbstractNativeToolHandler.java:254)
> 	at org.jkiss.dbeaver.ext.mysql.tasks.MySQLNativeToolHandler.doExecute(MySQLNativeToolHandler.java:47)
> 	at org.jkiss.dbeaver.tasks.nativetool.AbstractNativeToolHandler.lambda$0(AbstractNativeToolHandler.java:60)
> 	at org.jkiss.dbeaver.runtime.RunnableContextDelegate.lambda$0(RunnableContextDelegate.java:39)
> 	at org.eclipse.jface.operation.ModalContext$ModalContextThread.run(ModalContext.java:122)