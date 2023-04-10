1on1やチームミーティングの調整を行うための社内ツール。

## 使用技術
- Next.js
- TypeScript
- Vercel
- Material UI
- Auth0

## 機能概要
- Auth0による認証、ログイン機能
- 管理者用ページ
  - チームの作成、編集、削除のリクエスト
  - ユーザーの作成、編集、削除のリクエスト
- ミーティング作成、編集、削除のリクエスト

## 今後の予定
- Googleカレンダー連携
- Slack通知機能
- アイスブレイクの話題提供機能

## 苦労したこと、工夫したこと
- Auth0で認証機能   
  `AxiosClientProvider.tsx`でAuth０からアクセストークンを取得し、  
  axiosのinterceptorsでリクエストヘッダーに渡す処理を共通化。
- useEffect内で非同期処理を行う際に想定した順番で処理ができなかった  
  `AxiosClientProvider.tsx`でアクセストークンをリクエストヘッダーに設定し、  
  `CurrentUserProvider.tsx`でログインユーザー情報を取得する処理がうまくいかずに苦労した。
  `AxiosClientProvider.tsx`でhasTokenというstateを持たせてContextで共有、
  `CurrentUserProvider.tsx`にてhasToken更新後にログインユーザー情報を取得するようにした。
- ミーティング編集フォームをダイアログで実装する際に、全てのダイアログが開いてしまい編集したいデータを渡すことができない。 
  編集対象のデータをstateで管理して、propsのopenに、対象データとダイアログに渡したデータが一致するかを渡した。



- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
