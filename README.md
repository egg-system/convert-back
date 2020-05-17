# data-convert-back
## 概要
- data convert srviceのバックエンド

## 環境構築の方法
- `docker-compose up -d build`を実行する
- 以下、2種類のコマンドでテストを実行できる
  - `yarn test`
    - テストコードのみを編集する際の実行コマンド
      - コンパイルしないので、速度が早い
  - `yarn buildTest`
    - テストするコードを編集した際の実行コマンド
      - コンパイル後に、テストを実行する
      - 開発やデバッグ時に実行する

## 各種テストの実装方法について
- mochaとchaiを使って、テストしている
  - mocha
    - https://mochajs.org/
  - chai
    - https://www.chaijs.com/
