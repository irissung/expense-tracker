# 懶人記帳本-錢錢去哪兒
使用Express 與 Node.js 及 Mongodb 開發的記帳本小程式，可以查看紀錄支出項目與金額

## 專案畫面
![image](https://github.com/irissung/expense-tracker/blob/master/public/image/homepage.PNG)

## 功能
- 可透過"錢錢在哪兒"至首頁瀏覽支出項目。
- 首頁可以看到支出總金額。
- 可以篩選支出類別，並顯示此類別的合計支出金額。
- 可以新增一筆支出。
- 可以編輯支出 (一次只能編輯一筆)。
- 可以刪除任何一筆支出 (一次只能刪除一筆)。

### 啟動方式
- 將專案clone到本地端
  ```
  git clone https://github.com/irissung/expense-tracker.git
  ```

- 進入到專案資料夾後，安裝packages
  ```
  cd expense-tracker
  npm install
  ```

- 可執行腳本
  ```
  node models/seeds/categorySeeder.js
  node models/seeds/recordSeeder.js
  ```

- 透過nodemon啟動專案
  ```
  npm run dev
  ```
  或
  ```
  npm start
  ```

- 在terminal可以看到 Express is listening on localhost : 3000，開啟瀏覽器在網址列輸入localhost:3000

### 開發環境
- Node.js: v10.15.0
- Express: v4.17.1
- Express-Handlebars: v4.0.4

### 開發人員
Iris Sung