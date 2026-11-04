# Dify入門 — 簡易学習アプリ

Difyをこれから触る初学者向けの、日本語・ログイン不要の静的Webアプリです。

## 構成
- レッスン 8本：Difyとは／アプリの種類／最初のアプリ作成手順／プロンプトと変数／ナレッジベース（RAG）／公開方法／APIとAPIキー／よくあるつまずき
- 確認クイズ 12問（4択、即時フィードバック＋解説）
- 進捗はブラウザの localStorage に保存（サーバー送信なし）

## 技術選定（判断記録）
- ビルド不要の Vanilla HTML / CSS / JavaScript を採用。理由：簡易版が前提であり、依存ゼロで GitHub Pages 等の静的ホスティングにそのまま置け、保守が容易なため。フレームワークは使わない。
- ファイル：`index.html` / `style.css` / `app.js` の3点のみ。

## 内容の根拠（一次情報）
- Dify公式ドキュメント docs.dify.ai：Home、Key Concepts（Workflow / Chatflow、変数、DSL 等）
- Dify公式ブログ dify.ai：Get Started with Dify、How to Create Knowledge in Dify (For Beginner)
- Service API案内：アプリごとのAPIキー、Cloud のベースURL `https://api.dify.ai/v1`、`Authorization: Bearer` ヘッダー
- 確認日：2026-11-04。仕様は更新されるため、アプリ内フッターにも公式確認を促す注意書きを配置。

## 検証メモ（2026-11-04）
- 内容は公式Docs（Home / Key Concepts / Version Control / Publish Overview / Get Started with the Dify API）と公式ブログ（Get Started / Knowledge入門）と複数回照合。公開まわりは「Current Draft → Publish Update → Latest Version」の公式用語に合わせて記載。
- 使い倒し検証：全レッスン切替・前後移動・完了チェック・進捗の保持、クイズ全問の正解／不正解パス、回答ロック、リトライ、破損した localStorage でも起動すること等、自動チェック66項目が全パス（2回連続）。
- クイズは1問につき回答1回まで（解説表示後の回答変更は不可）。やり直しはリトライボタンから。
- 375px幅向け：固定幅の使用なし、表は固定レイアウト＋折り返し、ヘッダーは折り返し対応。ピクセル単位の実機スクリーンショット確認は公開後に公開URLで実施する。

## ローカル確認
ブラウザで `index.html` を開くか、簡易サーバーで配信してください。

## GitHub配信について
GitHubコネクタではリポジトリ新規作成ができない（403）ため、本リポジトリの新規作成はユーザー側の対応が必要です。リポジトリが用意されれば、配信ルール（節目バースト、push-files 1回集約）に従って配信します。
