### 项目vue-bms

#####项目运行环境

* nodejs
* mysql

##### 运行步骤：

1. `项目根目录`下打开命令行程序(`cmd`等等)，安装项目需要的包

   `npm install`

2. 运行`项目根目录`下的文件`bms.sql`

   该文件中创建了用户`bmsAdmin`，默认密码为`dbFinalProject`

   再次运行该文件时，需要注释掉：

   ```sql
   CREATE USER 'bmsAdmin'@'localhost' IDENTIFIED BY 'dbFinalProject';
   GRANT ALL ON bms.* TO 'bmsAdmin'@'localhost';
   ```

3. 启动

   * 启动客户端（端口`8080`）
     * `项目根目录`下执行命令`npm run dev`
   * 启动服务端（端口`3000`）
     * 在`vue-bms\server`目录下执行命令`node index`

4. 浏览器打开`http://localhost:8080/`

   * 登陆
     * 账号：`admin`
     * 密码：`123456`