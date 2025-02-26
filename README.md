# オセロゲーム

Reactとstyled-componentsを使用して実装したオセロ（リバーシ）ゲームです。

## 機能

- 8x8のゲームボード
- 黒と白の石の配置
- 有効な手の表示
- 石を置いた際の自動ひっくり返し
- 現在のプレイヤーの表示
- スコア表示
- ゲームリセット機能

## 技術スタック

- React
- styled-components
- Webpack
- Babel

## インストール方法

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/othello-game.git
cd othello-game

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 使い方

1. 開発サーバーを起動すると、ブラウザで http://localhost:3000 にアクセスできます
2. 緑色の薄い円で表示されている有効な手をクリックして石を置きます
3. 相手の石を挟むと自動的にひっくり返ります
4. 両プレイヤーとも石を置けなくなるとゲーム終了です
5. 「ゲームをリセット」ボタンでゲームを初期状態に戻せます

## ビルド方法

```bash
# 本番用ビルド
npm run build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。

## ライセンス

MIT