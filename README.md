# NUTMEG-Seeds

## ブランチルール
- masterブランチ
  - 安定ブランチ，本番用ブランチ
- developブランチ
  - 開発用ブランチ，開発段階での安定ブランチ，これを公開するときに安定ブランチにマージ
- feature/[NAME]/[ISUEE_NUM]-[TITLE]
  - 機能の追加や変更などを行うブランチ，developブランチから派生
  - ex) feature/dodo/1-create-view-env
- fix/[NAME]/[ISUEE_NUM]-[TITLE]
  - バグの修正などを行うブランチ，developブランチから派生
  - ex) fix/dodo/2-fix-view-env

### コミットルール
- コミットメッセージはissue番号を載せる
- コミットメッセージは行った開発を端的にわかりやすく書く（長すぎないように注意する）
- コミットメッセージラベルを付ける
  - [add] file or directory の追加
  - [mod] file or directory の編集
  - [fix] file or directory のバグや軽微な修正
  - [del] file or directory の削除
  - [otr] その他
- ex)  
  - `git commit -m "[add] model group (#1)"`  
  - `git commit -m "[fix] login page (#2)"`  
  - `git commit -m "[mod] mypage (#3)"`


## ビルド方法
in `root`

`make build`

* 初めてbuildした場合
    
    build後は`docker compose up`をしないとコンテナが立ち上がらないため注意

## 開発
### 開発の進め方
* `docker compose up (-d)` (-d は任意)でコンテナを立ち上げる
* http://localhost:8080 に移動し、正常に表示されていることを確認する
### Tips
* http://localhost:3000 に移動するとapiが確認できる
* npm を使ってライブラリ等をインストールするときは以下のコマンドを実行
    
    `docker compose run --rm [コンテナ名] npm install [ライブラリ名]`
    
    ただし、この方法でライブラリを入れるときは、他の人も上記のコマンドを実行する必要があるので注意

    
