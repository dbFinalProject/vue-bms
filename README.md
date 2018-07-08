### 项目vue-bms

##### 项目运行环境

* nodejs
* mysql

##### 运行步骤：

1. `项目根目录`下打开命令行程序(`cmd`等等)，安装项目需要的依赖包（正常安装如下图所示）

   `npm install` 

   ```sql
   λ npm install

   > chromedriver@2.40.0 install C:\Users\liuyh73\Desktop\vue-bms\node_modules\chromedriver
   > node install.js

   Downloading https://chromedriver.storage.googleapis.com/2.40/chromedriver_win32.zip
   Saving to C:\Users\liuyh73\AppData\Local\Temp\chromedriver\chromedriver_win32.zip
   Received 782K...
   Received 1563K...
   Received 2345K...
   Received 3126K...
   Received 3376K total.
   Extracting zip contents
   Copying to target path C:\Users\liuyh73\Desktop\vue-bms\node_modules\chromedriver\lib\chromedriver
   Done. ChromeDriver binary available at C:\Users\liuyh73\Desktop\vue-bms\node_modules\chromedriver\lib\chromedriver\chromedriver.exe

   > uglifyjs-webpack-plugin@0.4.6 postinstall C:\Users\liuyh73\Desktop\vue-bms\node_modules\webpack\node_modules\uglifyjs-webpack-plugin
   > node lib/post_install.js

   npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
   npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

   added 1611 packages from 1101 contributors and audited 33562 packages in 113.399s
   found 7 vulnerabilities (1 low, 1 moderate, 4 high, 1 critical)
     run `npm audit fix` to fix them, or `npm audit` for details
   ```

   ​

2. 运行`项目根目录`下的文件`bms.sql`

   该文件中创建了用户`bmsAdmin`，默认密码为`dbFinalProject`

   再次运行该文件时，需要注释掉：

   ```sql
   CREATE USER 'bmsAdmin'@'localhost' IDENTIFIED BY 'dbFinalProject';
   GRANT ALL ON bms.* TO 'bmsAdmin'@'localhost'; //给用户授权只能访问bms数据库
   ```
   - 如果不想创建新的用户，可以注释掉上面两句话，然后运行该文件；并修改server/db.js文件中数据库相应的配置（user和password）

3. 启动

   * 启动客户端（端口`8080`）
     * `项目根目录`下执行命令`npm run dev`
   * 启动服务端（端口`3000`）
     * 在`vue-bms\server`目录下执行命令`node index`

4. 浏览器打开`http://localhost:8080/`

   * 登陆
     * 账号：`admin`
     * 密码：`123456`