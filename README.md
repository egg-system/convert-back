# csv-convert-back
## 概要
- AWSのlamdaの実装内容を保持するためのレポジトリ
- 現状は、AWSのlamdaを直接編集しながら、修正する

### ビルド方法
- デプロイ用のファイルは以下のコマンドにより生成
    - npm run build
- 上記のコマンドにより生成された`convert-layer.zip`をlamdaにアップロードする
