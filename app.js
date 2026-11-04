const LESSONS=[
{id:"intro",num:"レッスン 1 / 8 ・ 約3分",title:"Difyとは",desc:"全体像と始め方",lead:"Difyは、AIアプリを画面操作で作って公開できるオープンソースのプラットフォームです。",html:`
<h2>ひとことで言うと</h2>
<ul>
<li>Difyは <strong>オープンソースのAIアプリ開発プラットフォーム</strong>です。自分のデータをもとに答えるチャットボット、エージェント、ワークフローを作り、Webアプリとして公開したりAPIで連携したりできます（公式Docs Home）。</li>
<li>名前の由来は <strong>Do It For You</strong> です（公式Docs Home）。</li>
<li>コードを最初から全部書かなくても、<strong>Studio</strong> という画面で部品（ノード）を組み合わせて作れるのが入口です。</li>
</ul>
<h2>2つの始め方</h2>
<table class="table"><tr><th>方法</th><th>特徴</th></tr>
<tr><td><strong>Dify Cloud</strong></td><td>管理されたクラウド。インストール不要で、無料のSandboxプランからすぐ始められます。</td></tr>
<tr><td><strong>Self-Host（セルフホスト）</strong></td><td>オープンソース版を自分のサーバー等で動かします。Docker Composeでデプロイする方式が案内されています。</td></tr></table>
<h2>大事な考え方</h2>
<ul><li><strong>モデルに依存しない（model-agnostic）</strong>：複数のモデルプロバイダーから選べます。先にモデルプロバイダーの設定が必要です。</li>
<li><strong>作って終わりではない</strong>：作る（Studio）→ 試す（デバッグ／プレビュー）→ 公開する（Publish）→ APIやWebで使う、が基本の流れです。</li></ul>
<div class="callout">初学者はまずCloudで小さなアプリを1つ公開まで通すのがおすすめです。仕組みは後からレッスンごとに分けて学べます。</div>
<h2>たとえば、こんなときに使います</h2>
<ul>
<li><strong>社内の質問係</strong>：就業規則や手順書をナレッジに入れておき、社員からの質問に答えるチャットボット</li>
<li><strong>文章づくりの補助</strong>：会議メモを貼ると、要約や議事録の下書きを作ってくれるアプリ</li>
<li><strong>定型作業の自動化</strong>：届いた文章を分類したり、決まった形式に整えたりする処理</li>
</ul>
<p>どれも「LLMに指示する（プロンプト）」「資料を検索させる（ナレッジ）」「流れを組み立てる（ノード）」の組み合わせでできています。この先のレッスンで、その部品を1つずつ見ていきます。</p>
<div class="callout">プログラミングの経験は前提にしていません。画面操作で組み立てるのが基本なので、まずは小さく触って1つ公開してみるのが近道です。</div>
<h2>誤解しやすい点：モデルは「作る」のではなく「つなぐ」</h2>
<p>Difyの中でAIモデル自体を学習・作成するわけではありません。GPTやClaudeなどの<strong>既存のモデルを、モデルプロバイダーの設定で接続して使う</strong>のがDifyの役割分担です（レッスン3の手順2）。自分のPCで動かすローカルモデル（Ollama経由など）を接続先に選ぶこともできます。</p>`},
{id:"types",num:"レッスン 2 / 8 ・ 約4分",title:"アプリの種類",desc:"Workflow / Chatflow が中心",lead:"現在の公式ドキュメントでは Workflow と Chatflow が主な種類で、基本タイプとして Chatbot・Agent・Text Generator も選べます。",html:`
<h2>主な2種類（公式 Key Concepts）</h2>
<table class="table"><tr><th>種類</th><th>向いていること</th><th>会話の記憶</th></tr>
<tr><td><strong>Workflow</strong></td><td>1回で完結する処理。要約・翻訳・分類・バッチ処理・定期実行など</td><td>なし（単発実行）</td></tr>
<tr><td><strong>Chatflow</strong></td><td>会話の流れの中で毎ターン動く処理。対話型の質問応答など</td><td>あり。会話変数やLLMノードのメモリを使える</td></tr></table>
<ul><li>Workflowの開始は <strong>User Input</strong>（人やAPIが実行）か <strong>Trigger</strong>（スケジュールや外部イベントで自動実行）です。</li>
<li>Chatflowは常に <strong>User Input</strong> から始まり、会話の途中でテキストやファイルを段階的に出すこともできます。</li></ul>
<h2>基本タイプ（Basic）</h2>
<table class="table"><tr><th>種類</th><th>向いていること</th></tr>
<tr><td><strong>Chatbot</strong></td><td>シンプルな対話型の質問応答を手早く作りたいとき</td></tr>
<tr><td><strong>Agent</strong></td><td>AI自身が考えて手順を選び、検索などのツールを使って自律的に解くタスク</td></tr>
<tr><td><strong>Text Generator</strong></td><td>レポートや要約など、構造のある文章を生成する用途</td></tr></table>
<div class="callout">迷ったら：対話が続くなら Chatflow、1回で結果が返れば十分なら Workflow、が最初の判断軸です。</div>
<h2>迷ったときの決め方（3つの質問）</h2>
<ol>
<li><strong>会話が何往復も続きますか？</strong> → 続くなら Chatflow（または基本タイプのChatbot）</li>
<li><strong>入力したら1回で結果が返れば十分ですか？</strong> → Workflow（要約・翻訳・分類など）</li>
<li><strong>決まった時刻や外部の出来事で自動で動かしたいですか？</strong> → Workflow の Trigger 開始</li>
</ol>
<p>たとえば「製品マニュアルへの質問に会話形式で答える」なら Chatflow、「毎朝届くレポートを要約する」なら Workflow（Triggerで定期実行）が向いています。</p>
<h2>基本タイプの「たとえば」</h2>
<ul>
<li><strong>Chatbot</strong>：よくある質問に答える窓口係。まずはこれで「作れた」を体験するのが早道です</li>
<li><strong>Agent</strong>：自分で調べ方を考えて動く調査係。Web検索などのツールと組み合わせます</li>
<li><strong>Text Generator</strong>：日報・要約・お知らせ文の下書きを作る文章係</li>
</ul>
<p>基本タイプは手早く作れる入口です。「途中の手順を自分で細かく組みたい」と感じたら、それがWorkflow / Chatflowに進む合図です。</p>`},
{id:"first",num:"レッスン 3 / 8 ・ 約4分",title:"最初のアプリ作成手順",desc:"作成から公開までの流れ",lead:"テンプレートから始める方法と、空白から作る方法があります。ここでは空白から作る基本手順を覚えます。",html:`
<h2>手順</h2>
<ol>
<li><strong>アカウントを用意</strong>：Dify Cloudにサインアップするか、セルフホスト環境にログインします。</li>
<li><strong>モデルプロバイダーを設定</strong>：アバター → 設定 → モデルプロバイダーで、使うLLMをインストール／設定します。これを忘れるとLLMノードが動きません。</li>
<li><strong>Studioでアプリを作成</strong>：Create から「Create from Blank（空白から作成）」を選び、アプリの種類（Workflow / Chatflow、または基本タイプ）を選んで名前を付けます。テンプレートから始める場合は Explore のテンプレートも使えます。</li>
<li><strong>組み立てる（Orchestrate）</strong>：キャンバスにノードを置いてつなぎ、プロンプトや変数を設定します。</li>
<li><strong>試す</strong>：プレビュー／デバッグで実際に入力を入れて結果を確認します。</li>
<li><strong>公開する</strong>：Workflow / Chatflow の下書き（Draft）は利用者には見えません。Publish して初めて、公開版としてWebアプリやAPIで使えます（レッスン6）。</li>
</ol>
<h2>ノードとは</h2>
<p>ノードはワークフローの <strong>1つ1つの手順・部品</strong> です。LLM、Knowledge Retrieval（ナレッジ検索）、条件分岐などのノードをつなぐことで、アプリの処理の流れを作ります。</p>
<div class="callout">最初の1つは完璧を目指さず「入力 → LLM → 出力」を公開まで通すことを目標にすると、全体像がつかめます。</div>
<h2>最初の1つでよくある失敗</h2>
<ul>
<li><strong>モデルプロバイダーの設定忘れ</strong>：LLMノードが選べない・動かないときは、まず手順2の設定を確認してください。いちばん多いつまずきです。</li>
<li><strong>いきなり複雑に作る</strong>：最初は「入力 → LLM → 出力」の3ノードで十分です。公開まで通してから部品を足しましょう。</li>
<li><strong>Publishのし忘れ</strong>：プレビューで動いても、Publishするまで利用者向けには公開されません（レッスン6）。</li>
</ul>
<h2>試すときの入力例</h2>
<p>プレビューでは、利用者になったつもりで具体的な入力を入れてみてください。たとえば要約アプリなら、短い文章と一緒に「この文章を3行で要約して」のような実際の使い方に近い入力を試すと、プロンプトの直しどころが見えてきます。うまく答えないときは、モデルではなく<strong>プロンプト（指示の書き方）</strong>を疑うのが順番です（レッスン4）。</p>`},
{id:"prompt-var",num:"レッスン 4 / 8 ・ 約4分",title:"プロンプトと変数",desc:"指示とデータの渡し方",lead:"プロンプトはAIへの指示、変数はノード間でデータを受け渡すための「名前付きの入れ物」です。",html:`
<h2>プロンプトの役割</h2>
<ul><li>LLMノードなどで「何を、どんな形式で、どんな立場で答えるか」を指示する文章です。</li>
<li>あいまいに書くと出力もぶれます。目的・出力形式・禁止事項などを具体的に書くのが基本です。</li></ul>
<h2>変数の種類（公式 Key Concepts）</h2>
<table class="table"><tr><th>種類</th><th>説明</th></tr>
<tr><td><strong>Inputs（入力）</strong></td><td>User Inputノードで定義し、利用者が実行時に埋める値。実行開始時に決まり、途中で更新されません。</td></tr>
<tr><td><strong>ノードの出力</strong></td><td>各ノードが出す結果。後続のノードから参照できます。これも更新されるものではありません。</td></tr>
<tr><td><strong>Environment Variables（環境変数）</strong></td><td>アプリ全体で共有する値。テスト／本番で変えたいエンドポイントなどに。秘密情報には Secret 型を使います。</td></tr>
<tr><td><strong>Conversation Variables（会話変数）</strong></td><td>Chatflow専用。1つの会話の中でターン（往復）をまたいで保持され、Variable Assignerノードで更新できます。</td></tr>
<tr><td><strong>システム変数</strong></td><td><code>sys.user_id</code>、<code>sys.conversation_id</code> など <code>sys.</code> で始まる、Difyが用意する値です。種類（Workflow / Chatflow）によって用意されるものが違います。</td></tr></table>
<h2>変数の渡し方</h2>
<ul><li>ノードの設定欄でドロップダウンから変数を選ぶ方法と、テキスト欄で <code>/</code> を打って変数を挿入する方法があります。</li>
<li>例：プロンプトの中に利用者の入力変数を埋め込むと、入力ごとに違う内容をLLMへ渡せます。</li></ul>
<pre><code>あなたは社内ヘルプ担当です。
次の質問に、簡潔に答えてください。
質問：{{利用者の質問の変数}}</code></pre>
<p>※ 上の <code>{{ }}</code> は説明のための表記です。実際の画面では変数ピッカーで挿入してください。</p>
<h2>変数の中身が置き換わるイメージ</h2>
<p>利用者が入力した値が、そのままプロンプトの一部に差し込まれるイメージです。</p>
<pre><code>利用者の入力（変数「質問」の中身）：
  有給休暇は年に何日ありますか？

LLMへ渡されるプロンプト：
  あなたは社内ヘルプ担当です。
  次の質問に、簡潔に答えてください。
  質問：有給休暇は年に何日ありますか？</code></pre>
<div class="callout">注意：変数はピッカーで選んで挿入してください。変数名を手でそのまま打ち込むと、ただの文字列として扱われ、中身に置き換わりません。</div>`},
{id:"knowledge",num:"レッスン 5 / 8 ・ 約5分",title:"ナレッジベース（RAG）の基礎",desc:"自分の資料から答えさせる",lead:"Knowledge（ナレッジ）に資料を入れておくと、アプリがその内容を検索して根拠として答えられるようになります。これがRAGの基本です。",html:`
<h2>RAGとは</h2>
<p>RAGは Retrieval-Augmented Generation（検索で補強した生成）のことです。質問に合う資料の部分を <strong>検索（Retrieval）</strong> し、その内容をLLMに渡して <strong>生成（Generation）</strong> させる仕組みです。モデルが知らない社内資料などにも答えやすくなります。</p>
<h2>ナレッジ作成の流れ（公式入門）</h2>
<ol>
<li>左メニューの <strong>Knowledge</strong> から新規作成し、「すぐに使えるナレッジベースを作る」等を選びます。</li>
<li><strong>取り込み方法</strong>を選ぶ：ファイルから取り込む／Notionから同期／Webサイトから同期、など。</li>
<li><strong>Chunk Settings（チャンク設定）</strong>：文書を検索しやすい小さな塊（チャンク）に分ける設定。最初は General（既定）が無難です。保存前に Preview Chunk で分け方を確認できます。</li>
<li><strong>Index Method（インデックス方法）</strong>：<strong>High Quality（推奨）</strong>は埋め込みモデルで意味による検索が可能、<strong>Economical</strong>はキーワードの一致を中心に探す方法です。</li>
<li><strong>Retrieval Setting（検索設定）</strong>：質問とチャンクの合わせ方。最初は既定でよく、後から変えられます。</li>
<li>処理が終わるのを待ち、<strong>検索テスト</strong>で意図した部分が返るか確認します。</li>
</ol>
<h2>アプリへのつなぎ方</h2>
<ul><li>Chatflow / Workflow に <strong>Knowledge Retrieval ノード</strong> を置き、作ったナレッジを選びます。</li>
<li>その検索結果を LLMノードの文脈（コンテキスト）として渡し、Answer / 出力につなぎます。</li></ul>
<div class="callout">答えがおかしいときは、プロンプトの前にまず「検索で正しいチャンクが返っているか」を検索テストで確認するのが近道です。</div>
<h2>チャンクのイメージ</h2>
<p>チャンクは「長い文書に付箋を貼って区切った1区切り」のようなものです。100ページの就業規則を丸ごとAIに渡すのではなく、質問に関係する数区切りだけを取り出して渡します。だから、分け方（チャンク設定）が答えの質に直結します。</p>
<h2>たとえば：就業規則Q&amp;Aができるまで</h2>
<ol>
<li>就業規則のPDFをナレッジに取り込む（自動でチャンクに分かれます）</li>
<li>検索テストで「有給休暇の日数」と聞き、該当する条文のチャンクが返るか確かめる</li>
<li>Chatflowに Knowledge Retrieval ノードを置いてこのナレッジを選び、LLMノードへつなぐ</li>
<li>公開して、社員がチャットで質問できるようにする</li>
</ol>`},
{id:"publish",num:"レッスン 6 / 8 ・ 約3分",title:"公開方法",desc:"Webアプリ・埋め込み・API",lead:"作ったアプリは Publish（公開）して初めて、他の人や他のシステムから使えるようになります。",html:`
<h2>公開の基本</h2>
<ul>
<li>Workflow / Chatflow では、編集中の内容は <strong>Current Draft（下書き）</strong> で、利用者が見るのは公開版の <strong>Latest Version</strong> です（公式Docs「Version Control」）。</li>
<li>下書きを公開版にする操作が <strong>Publish → Publish Update</strong> です。公開すると、その時点の設定でWebアプリとAPIエンドポイントが提供されます（公式Docs「Publish Overview」）。</li>
<li><strong>編集しただけでは公開版は変わりません。</strong>直したら Publish Update が必要です。これが「直したのに反映されない」の一番多い原因です。</li>
<li>公開前には必ずプレビュー／デバッグで動くことを確認します。</li>
</ul>
<h2>公開後の使い方</h2>
<table class="table"><tr><th>方法</th><th>説明</th></tr>
<tr><td><strong>Webアプリ</strong></td><td>発行されるURLを開いて使う、ブラウザ向けの画面です。</td></tr>
<tr><td><strong>埋め込み</strong></td><td>自分のWebサイト等にチャット画面等を埋め込む使い方です。</td></tr>
<tr><td><strong>API</strong></td><td>自分のプログラムから呼び出す方法です（次のレッスン）。</td></tr>
<tr><td><strong>MCPサーバーとして</strong></td><td>公開したアプリへ MCP 経由でアクセスできる場合があります（公式 Key Concepts）。</td></tr></table>
<div class="callout">誰に公開するか（社内だけか、URLを知る人か等）は利用環境の設定にも左右されます。公開範囲は公開前に必ず確認してください。</div>
<h2>下書きと公開版のイメージ</h2>
<p>下書きは「手元の原稿」、公開版は「印刷して配った本」のようなものです。原稿を直しても、印刷し直す（Publish Update）までは、読者の手元にある本は古いままです。</p>
<ul>
<li>公開するたびに、その時点の版が<strong>バージョン</strong>として履歴に残ります。あとから「いつ・何を公開したか」をたどれます。</li>
<li>動作確認は下書き側（プレビュー／デバッグ）で行い、問題なければ公開する、という順番が安全です。</li>
</ul>
<h2>公開後にやることチェック</h2>
<ol>
<li>発行されたURLを自分でも開き、利用者の画面で正しく動くか確認する</li>
<li>プログラムから使う場合は、APIキーを作成する（レッスン7）</li>
<li>内容を直したら、そのつど Publish Update を忘れない</li>
</ol>`},
{id:"api",num:"レッスン 7 / 8 ・ 約5分",title:"APIアクセスとAPIキー",desc:"プログラムから呼び出す",lead:"公開したアプリはREST APIとしても呼び出せます。カギになるのが、アプリごとに作るAPIキーです。",html:`
<h2>ポイント</h2>
<ul>
<li><strong>APIキーはアプリごと</strong>です。アプリの中の API Access（APIアクセス）から作成します。そのアプリ専用（スコープはそのアプリだけ）で、別のアプリに使い回すことはできません。1つのキーで、そのアプリの全エンドユーザーをまかないます（公式Docs「Get Started with the Dify API」）。</li>
<li><strong>Knowledge用のキーは別物</strong>で、範囲が広めです。アプリ用キーと混同しないでください。</li>
<li>Dify CloudのベースURLは <code>https://api.dify.ai/v1</code> です。セルフホストの場合は自分のデプロイのAPIエンドポイントになります。</li>
<li>認証はHTTPヘッダーで送ります：<code>Authorization: Bearer {APIキー}</code></li>
</ul>
<h2>呼び出し例（チャット系のイメージ）</h2>
<pre><code>curl -X POST "https://api.dify.ai/v1/chat-messages" \\
  -H "Authorization: Bearer {APIキー}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "inputs": {},
    "query": "こんにちは",
    "response_mode": "blocking",
    "user": "my-user-001"
  }'</code></pre>
<ul><li>エンドポイントはアプリの種類で異なります（チャット系は <code>chat-messages</code>、テキスト生成系は <code>completion-messages</code>、Workflowはワークフロー実行用など）。アプリのAPIアクセス画面に表示される仕様が正本です。</li>
<li><code>user</code> は利用者を区別するための値です。アプリ側で決めたルールで一貫して付けてください。</li></ul>
<div class="callout"><strong>安全の鉄則：</strong>APIキーはサーバー側で保管し、ブラウザで動くコードや公開リポジトリに直接書かないでください。漏れると第三者に使われるおそれがあります。</div>
<h2>APIって何をしているの？</h2>
<p>APIは「プログラム同士の注文窓口」です。決まった宛先（エンドポイント）に、決まった形式（JSON）で注文（リクエスト）を送ると、結果（レスポンス）がJSONで返ってきます。上のcurlは、その注文をコマンドで書いたものです。</p>
<table class="table"><tr><th>部分</th><th>意味</th></tr>
<tr><td><code>POST .../v1/chat-messages</code></td><td>宛先。チャット系アプリへの送信先です</td></tr>
<tr><td><code>Authorization: Bearer ...</code></td><td>「このアプリのキーを持っています」という証明。合鍵のようなものです</td></tr>
<tr><td><code>"query": "こんにちは"</code></td><td>利用者の質問文</td></tr>
<tr><td><code>"response_mode": "blocking"</code></td><td>答えを一括で受け取る指定です（ほかに streaming＝少しずつ受け取る指定があります）</td></tr>
<tr><td><code>"user": "my-user-001"</code></td><td>利用者を区別するための名前。誰からの質問かをアプリ側で区別します</td></tr></table>
<p>返ってくるJSONには、AIの回答文や、会話を続けるための conversation_id などが含まれます（レッスン4・クイズも参照）。</p>`},
{id:"trouble",num:"レッスン 8 / 8 ・ 約4分",title:"よくあるつまずき",desc:"困ったときの切り分け",lead:"初学者がよく止まるポイントを、原因の切り分け順にまとめました。",html:`
<table class="table"><tr><th>症状</th><th>まず確認すること</th></tr>
<tr><td>LLMが動かない／モデルを選べない</td><td>モデルプロバイダーを設定したか、利用可能なモデルがあるか（レッスン3）</td></tr>
<tr><td>直したのに公開版が変わらない</td><td>編集後に Publish Update したか（レッスン6）</td></tr>
<tr><td>ナレッジの資料から答えない</td><td>検索テストで正しいチャンクが返るか、チャンク設定・High Quality等のインデックス設定、アプリに Knowledge Retrieval ノードが入っているか（レッスン5）</td></tr>
<tr><td>APIで 401 エラー</td><td>キーがそのアプリのものか、<code>Authorization: Bearer ...</code> の形で送っているか、アプリ用キーとKnowledge用キーを取り違えていないか（レッスン7）</td></tr>
<tr><td>変数が空になる／渡らない</td><td>User Inputで入力変数が定義されているか、後続ノードで正しい変数を参照しているか（レッスン4）</td></tr>
<tr><td>会話が前の内容を覚えない</td><td>種類が Workflow になっていないか。会話の継続が必要なら Chatflow（またはChatbot系）か、会話変数／メモリの設定を確認</td></tr>
<tr><td>Agentの種類が見当たらない</td><td>作成画面で基本タイプ（More basic app types 等）の表示を開いたか。画面仕様は更新されるため、公式ドキュメントもあわせて確認</td></tr></table>
<h2>切り分けのコツ</h2>
<ol><li>プレビューで再現するかを確認する（公開版だけの問題か切り分ける）</li><li>1つ手前のノードの出力を見る（どこからおかしいか特定する）</li><li>変数・検索結果・モデル設定の順に、入力側から確認する</li></ol>
<p>ここまで終わったら、上の「クイズ」タブで30問の確認クイズに挑戦してください。言葉の意味があいまいなときは<h2>切り分けの基本姿勢</h2>
<ul>
<li><strong>公開版だけの問題か、プレビューでも起きるか</strong>を分けると、原因の範囲が半分になります。</li>
<li><strong>直前に変えた場所</strong>から疑ってください。動いていた時点からの差分が、いちばんの手がかりです。</li>
<li>答えが「それっぽいのに違う」ときは、LLMより先に<strong>検索で渡されたチャンク</strong>を疑ってください。根拠がズレれば答えもズレます（レッスン5の検索テスト）。</li>
</ul>
<p>ここまで終わったら、上の「クイズ」タブで30問の確認クイズに挑戦してください。言葉の意味があいまいなときは「用語集」タブも使ってください。</p>`}
];
const QUIZ=[
{q:"Difyの説明として正しいものはどれですか？",c:["画像や動画などのメディア生成だけを行うAIツール","AIアプリを画面操作で作って公開できるオープンソース開発基盤","表計算や文書作成を支援する、オフィスソフトの拡張機能","メールの送受信と予定管理、ファイル共有を行うグループウェア製品"],a:1,e:"DifyはオープンソースのAIアプリ開発プラットフォームで、Studioで作ったアプリをWebアプリやAPIとして公開できます。"},
{q:"現在の公式ドキュメントで「主なアプリの種類」とされている組み合わせはどれですか？",c:["ChatbotとText Generatorを中心とする2種類","WorkflowとChatflowの2種類","AgentとText Generatorを中心とする2種類","ChatbotとAgentを中心とする2種類"],a:1,e:"公式Key Conceptsでは、主な種類はWorkflowとChatflowとされています。基本タイプとしてChatbot・Agent・Text Generatorも選べます。"},
{q:"Workflowが向いている用途はどれですか？",c:["会話を何往復も続けて、文脈を引き継ぐ対話処理","1回で完結する要約・翻訳・バッチ処理","メモリを使って前回の回答内容を参照する処理","画像や音声ファイルを編集して出力する処理"],a:1,e:"Workflowは単発（single-turn）のタスク向けです。会話の継続が必要ならChatflowを検討します。"},
{q:"Chatflowだけにある特徴として正しいものはどれですか？",c:["応答にはAnswerノードではなくEndノードを使う","会話変数を保持でき、LLMノードでメモリを使える","公開方法はAPI呼び出しには対応していない","変数はノードごとに毎回作り直す必要がある"],a:1,e:"Chatflowは会話ごとに実行され、会話変数やメモリなどの会話向け機能があります。常にUser Inputから始まります。"},
{q:"最初のアプリ作成で、LLMを使う前に必要な設定はどれですか？",c:["利用するためのAPIキーを先に作成する","モデルプロバイダーを設定する","ナレッジを作成して資料を取り込んでおく","ワークスペースのメンバー招待を済ませる"],a:1,e:"設定のモデルプロバイダーで使うLLMを用意しておく必要があります。これがないとLLMノードが動きません。"},
{q:"変数（Variable）の説明として正しいものはどれですか？",c:["取り込んだ文書を検索用に分けた単位のこと","情報を入れて名前で参照し、後から使う入れ物","アプリを公開するときに発行される専用URLのこと","モデルの利用料金を計算するときの単位のこと"],a:1,e:"公式Key Conceptsでは、変数は情報を保存し名前で参照するためのラベル付きコンテナと説明されています。"},
{q:"Chatflow専用の変数はどれですか？",c:["環境変数（Environment Variables）","システム変数（System Variables）","会話変数（Conversation Variables）","入力変数（User Input Variables）"],a:2,e:"会話変数はChatflow専用で、1つの会話のターンをまたいで値を保持し、Variable Assignerで更新できます。"},
{q:"ナレッジ（RAG）で「チャンク」とは何ですか？",c:["APIキーを発行するときの識別名","文書を検索しやすく分けた小さな塊","会話が何往復したかを示すカウンタ","モデルの種類を切り替える設定項目"],a:1,e:"取り込んだ文書はチャンクという小さな塊に分けられ、質問に合うチャンクが検索されます。保存前にPreview Chunkで確認できます。"},
{q:"インデックス方法で、意味による検索ができる推奨設定はどれですか？",c:["Economical","High Quality","Trigger","Secret"],a:1,e:"High Qualityは埋め込みモデルを使って意味による検索ができ、公式入門でも推奨されています。Economicalはキーワード中心です。"},
{q:"Workflowで編集した内容が公開版に反映されないとき、まず疑うべきことはどれですか？",c:["モデルプロバイダーを別のものに変更していないこと","編集後にPublish Updateをしていないこと","ナレッジの再インデックスをまだ実行していないこと","ブラウザに残った古いキャッシュを見ていること"],a:1,e:"編集中はCurrent Draft（下書き）で、公開版はLatest Versionです。Publish → Publish Updateで下書きを公開版にする必要があります。"},
{q:"DifyのService APIでAPIキーについて正しいものはどれですか？",c:["全アプリで共通のマスターキーを1つ使う","キーはアプリごとに作り、そのアプリ専用である","キーは利用者のブラウザ側で発行・保持する","キーはワークスペース単位で月ごとに変わる"],a:1,e:"アプリ用APIキーはアプリごとに作成し、そのアプリ専用です。Knowledge用キーとは別物です。"},
{q:"APIリクエストの認証ヘッダーとして正しい形はどれですか？",c:["API-Key: {APIキー} の形でリクエスト本文に含める","Authorization: Bearer {APIキー}","Cookie: session={APIキー} の形で送る","URLのクエリパラメータ ?key={APIキー} で送る"],a:1,e:"認証は Authorization: Bearer {APIキー} のヘッダーで送ります。キーはサーバー側で保管してください。"},
{q:"Dify DSLとは何ですか？",c:["画像や動画を圧縮して配信するためのメディア形式","アプリ構成（ノードや変数）を表すYAML形式","利用料金のプランと支払い方法を定義する設定形式","モデルの学習に使う教師データをまとめて記録する形式"],a:1,e:"DSLはアプリの作りや設定を表すYAML形式です。ログやナレッジベースのデータ自体は含みません。書き出すとアプリの共有や移行に使えます。"},
{q:"ノード（Node）の説明として正しいものはどれですか？",c:["ワークスペースに参加する利用者のアカウント","キャンバスに置く処理の部品で、つないで使う","APIキーを発行するときに作られる識別子","取り込んだ文書を分割したチャンクの別名"],a:1,e:"ノードはワークフローの部品です。LLMやナレッジ検索などのノードをつないで、AIにたどらせたい流れを作ります。"},
{q:"Difyの「ツール（Tools）」でできることはどれですか？",c:["モデルの利用料金を自動で割り引く仕組み","Web検索など外部サービスとつなぐ仕組み","取り込んだ文書を自動で翻訳して保存し直す仕組み","画面のテーマや配色を切り替えるための仕組み"],a:1,e:"ツール（プラグイン）を使うと、Web検索や天気の確認など、外部とのやり取りをアプリに組み込めます。"},
{q:"テンプレートから始める方法として案内されている場所はどれですか？",c:["Settings","Explore","Logs","Knowledge"],a:1,e:"Exploreには、マーケティングやデータ分析などの用途別テンプレートが用意されています。Detailsで作りを確認してから使うこともできます。"},
{q:"Workflowの開始ノードの種類はどれですか？",c:["AnswerとEndの2種類","User InputとTriggerの2種類だけ","LLMとKnowledge Retrievalの2種類","User InputとAnswerの2種類"],a:1,e:"WorkflowはUser InputかTriggerから始まります。Chatflowは常にUser Inputから始まる点が違いです。"},
{q:"システム変数 sys.conversation_id の役割はどれですか？",c:["モデルの利用料金を集計するための識別子","1つの会話セッションを識別するためのID","アップロードしたファイルを保存する場所","APIキーを自動で生成するときの種になる値"],a:1,e:"sys.conversation_idは会話セッションの一意なIDです。同じ会話のメッセージをグループ化するために使われます。"},
{q:"システム変数 sys.dialogue_count について正しいものはどれですか？",c:["利用者が手入力で書き換えられる設定値","会話の往復ごとに自動で1ずつ増える数","アップロードされたファイルの合計個数","実行時に発生したエラーの累計回数"],a:1,e:"sys.dialogue_countはChatflowの会話ターン数で、ターンごとに自動で増えます。IF/ELSEノードと組み合わせた分岐などに使えます。"},
{q:"環境変数で秘密情報（APIキーなど）を入れるとき使うべき型はどれですか？",c:["String型","Number型","Secret型","File型"],a:2,e:"Secret型にすると、アプリを書き出すときに値が含まれないようにできます（自分で含める選択をした場合を除く）。"},
{q:"プロンプトの中へ変数を挿入する方法として公式に案内されているものはどれですか？",c:["変数名を大文字に変えて本文へ書く","テキスト欄で/を打ち候補から選ぶ","設定画面で変数を公開状態に切り替える","モデル側のメモリ機能を有効化する"],a:1,e:"設定欄のドロップダウンで選ぶ方法のほか、テキスト入力では / を打って変数を選んで挿入できます。"},
{q:"ナレッジへ資料を取り込む方法に含まれないものはどれですか？",c:["ローカルのファイルを取り込む","Notionのページから同期する","Webサイトから同期（クロール）する","メールに添付して自動で取り込む"],a:3,e:"公式入門で案内される取り込みは、ファイル／Notion同期／Webサイト同期です。メールに添付して自動で取り込む方法は案内されていません。"},
{q:"High Qualityインデックスに必要なものはどれですか？",c:["Triggerノードをキャンバスに置くこと","埋め込みモデル（意味検索用の変換モデル）","MCPサーバーを外部に公開すること","独自ドメインでアプリを公開すること"],a:1,e:"High Qualityは埋め込みモデルでテキストをベクトル化し、意味による検索を可能にします。公式入門でも推奨設定です。"},
{q:"ナレッジを作った後、アプリで使う前にすべき確認はどれですか？",c:["検索テストで、質問に合うチャンクが返るか確認する","料金プランを上げて検索回数の上限を広げておく","アプリの名前とアイコンを公開用に整えておく","APIキーを新しく作成して接続を確認しておく"],a:0,e:"Retrieval Testing（検索テスト）で意図した部分が返るかを確認してから、アプリにつなぐのが確実です。"},
{q:"Knowledge Retrievalノードの役割はどれですか？",c:["画面の表示言語を利用者に合わせて翻訳する","質問に合う内容をナレッジから検索して取り出す","モデルに文書を学習させて知識を追加する","利用者の支払い方法を登録して決済を行う"],a:1,e:"Knowledge Retrievalノードがナレッジを検索し、その結果をLLMノードへ文脈として渡すことで、資料に基づく回答ができます。"},
{q:"公開したアプリへアクセスする方法に含まれないものはどれですか？",c:["WebアプリとしてURLで共有する","APIで外部システムから呼び出す","MCPサーバーとして公開する","専用アプリをストアで配布する"],a:3,e:"公式に案内される公開方法は、Webアプリ／API／MCPサーバー／サイトへの埋め込みなどです。専用アプリをストアで配布する方法は案内されていません。"},
{q:"APIでアプリ情報を確認する「Get App Info」の試し方として公式案内にあるものはどれですか？",c:["試すには専用の確認コードを書いて実行する必要がある","Try itからキーを貼ってSendする","試せる環境はセルフホスト版に限られている","ナレッジ用のAPIキーを持っている場合に試せる"],a:1,e:"公式のAPI入門では、Get App InfoのTry itにキーを貼って送るのが最速の初回確認とされています。"},
{q:"チャット系APIで会話を続けるために必要な考え方はどれですか？",c:["会話のたびにアプリを複製して新しく作り直す","conversation_idを引き継いで送る","会話のたびにAPIキーを変えて送信し直す","userの値を空にして毎回送信を繰り返す"],a:1,e:"会話型アプリでは、セッションごとにconversation_idが発行され、それを後続の呼び出しに含めることで会話がつながります。"},
{q:"Knowledge（ナレッジ）用のAPIキーについて正しい注意点はどれですか？",c:["アプリ用キーと同じものをそのまま使い回す","届く範囲が広めなので、取り扱いに注意する","公開リポジトリに含めて共有してもよい","ログイン用パスワードの代わりとして使う"],a:1,e:"Knowledge用キーはアプリ用キーとは別物で、到達できる範囲が広めです。作成したアカウントで見えるナレッジに届くため、慎重に扱います。"},
{q:"モデルプロバイダーを設定する画面の流れとして公式ブログ案内にあるものはどれですか？",c:["Knowledge → 新規作成 → モデルを選択する","アバター → 設定 → モデルプロバイダーで導入する","Studio → Publish → バージョンを公開する","API Access → キーを作成 → モデルを選択する"],a:1,e:"公式ブログでは「アバターをクリック → settings → model provider → LLMのアイコンからinstall」という流れが案内されています。"}
];const GLOSSARY=[
{t:"Dify",en:"Dify",d:"オープンソースのAIアプリ開発プラットフォーム。名前の由来は Do It For You。Studioでアプリを作り、WebアプリやAPIとして公開できます。",r:"レッスン1"},
{t:"Studio",en:"Studio",d:"Difyでアプリを作る作業画面。ここでアプリの作成、ノードの組み立て、アプリ一覧の管理を行います。",r:"レッスン3"},
{t:"Dify Cloud",en:"Dify Cloud",d:"Difyが提供する管理されたクラウド版。インストール不要で、無料のSandboxプランから始められます。",r:"レッスン1"},
{t:"セルフホスト",en:"Self-Host",d:"オープンソース版を自分のサーバー等で動かす方法。Docker Composeでのデプロイが案内されています。",r:"レッスン1"},
{t:"モデル非依存",en:"Model-agnostic",d:"特定のモデルに縛られず、複数のモデルプロバイダーからLLMを選べるというDifyの性質です。",r:"レッスン1"},
{t:"モデルプロバイダー",en:"Model Provider",d:"アプリが使うLLMを提供する事業者や、その接続設定のこと。設定画面のモデルプロバイダーからインストール／設定します。",r:"レッスン3"},
{t:"LLM",en:"Large Language Model",d:"大規模言語モデル。文章の生成や要約、質問への回答などを行うAIモデルそのものです。",r:"レッスン3"},
{t:"ノード",en:"Node",d:"ワークフローやチャットフローを構成する1つ1つの手順・部品。キャンバス上でつなぐことで処理の流れを作ります。",r:"レッスン3"},
{t:"Workflow（ワークフロー）",en:"Workflow",d:"1回で完結する処理のためのアプリ形式。要約・翻訳・バッチ処理などに向きます。開始はUser InputかTriggerです。",r:"レッスン2"},
{t:"Chatflow（チャットフロー）",en:"Chatflow",d:"会話のターン（往復）ごとに動くワークフロー形式。会話変数やLLMノードのメモリなど、会話向けの機能を持ちます。",r:"レッスン2"},
{t:"Chatbot（チャットボット）",en:"Chatbot",d:"基本タイプの1つ。シンプルな対話型の質問応答を手早く作りたいときに向きます。",r:"レッスン2"},
{t:"Agent（エージェント）",en:"Agent",d:"基本タイプの1つ。AI自身が考えて手順を選び、検索などのツールを使って自律的にタスクを解きます。",r:"レッスン2"},
{t:"Text Generator（テキスト生成）",en:"Text Generator",d:"基本タイプの1つ。レポートや要約など、構造のある文章の生成に向きます。",r:"レッスン2"},
{t:"User Input",en:"User Input",d:"アプリの開始ノードの1つ。利用者の入力やAPI呼び出しで実行が始まります。ここで入力変数を定義します。",r:"レッスン2・4"},
{t:"Trigger（トリガー）",en:"Trigger",d:"Workflowの開始方法の1つ。スケジュールや外部イベントをきっかけに自動で実行が始まります。",r:"レッスン2"},
{t:"プロンプト",en:"Prompt",d:"AIへの指示文。何を、どんな形式で、どんな立場で答えるかをLLMノードなどで指定します。",r:"レッスン4"},
{t:"変数",en:"Variable",d:"情報を入れておき、名前で参照して後から使うための入れ物。ノード間でデータを受け渡すために使います。",r:"レッスン4"},
{t:"入力変数",en:"Inputs",d:"User Inputノードで定義し、利用者が実行時に埋める値。実行開始時に決まり、途中で更新されません。",r:"レッスン4"},
{t:"環境変数",en:"Environment Variables",d:"アプリ全体で共有する値。秘密情報にはSecret型を使い、書き出し時に値が含まれないようにできます。",r:"レッスン4"},
{t:"会話変数",en:"Conversation Variables",d:"Chatflow専用の変数。1つの会話のターンをまたいで値を保持し、Variable Assignerノードで更新できます。",r:"レッスン4"},
{t:"システム変数",en:"System Variables",d:"sys.user_id や sys.conversation_id など、sys. で始まるDifyが用意する値。アプリの種類で用意されるものが違います。",r:"レッスン4"},
{t:"DSL",en:"Dify DSL",d:"アプリの構成（ノード・プロンプト・変数・設定）を表すYAML形式。アプリの書き出し・読み込みによる共有や移行に使います。ログやナレッジのデータは含みません。",r:"補足"},
{t:"Knowledge（ナレッジ）",en:"Knowledge",d:"アプリが参照する資料の置き場。ファイルの取り込み、Notion同期、Webサイト同期で作ります。RAGの土台です。",r:"レッスン5"},
{t:"RAG",en:"Retrieval-Augmented Generation",d:"検索で補強した生成。質問に合う資料を検索し、その内容をLLMに渡して答えさせる仕組みです。",r:"レッスン5"},
{t:"チャンク",en:"Chunk",d:"文書を検索しやすく分けた小さな塊。保存前にPreview Chunkで分け方を確認できます。",r:"レッスン5"},
{t:"インデックス方法",en:"Index Method",d:"チャンクを検索用に保存する方法。High Qualityは埋め込みモデルによる意味検索が可能で推奨。Economicalはキーワードの一致が中心です。",r:"レッスン5"},
{t:"埋め込みモデル",en:"Embedding Model",d:"テキストを意味で探せる数値（ベクトル）に変換するモデル。High Qualityインデックスに必要です。",r:"レッスン5"},
{t:"検索設定",en:"Retrieval Setting",d:"質問とチャンクの合わせ方の設定。最初は既定でよく、検索テストで結果を確認しながら調整します。",r:"レッスン5"},
{t:"Knowledge Retrievalノード",en:"Knowledge Retrieval Node",d:"質問に合う内容をナレッジから検索して取り出すノード。その結果をLLMへ渡して回答させます。",r:"レッスン5"},
{t:"ツール",en:"Tools",d:"アプリが外部とやり取りするためのプラグイン。Web検索や天気の確認などを組み込めます。",r:"補足"},
{t:"テンプレート／Explore",en:"Templates / Explore",d:"用途別の既成テンプレートを探せる場所。空白から作る代わりに、テンプレートから始めることもできます。",r:"レッスン3"},
{t:"Publish／Publish Update",en:"Publish / Publish Update",d:"下書き（Current Draft）を公開版（Latest Version）にする操作。編集内容を反映するには、この操作が必要です。",r:"レッスン6"},
{t:"Current Draft／Latest Version",en:"Current Draft / Latest Version",d:"Current Draftは編集中の下書きで利用者には見えません。Latest Versionが利用者向けの公開版です。",r:"レッスン6"},
{t:"Webアプリ",en:"Web App",d:"公開したアプリを使うためのブラウザ向け画面。発行されるURLから開きます。",r:"レッスン6"},
{t:"APIキー（アプリ用）",en:"App API Key",d:"アプリごとに作成するキーで、そのアプリ専用です。Authorization: Bearer ヘッダーで送ります。サーバー側で保管してください。",r:"レッスン7"},
{t:"Service API",en:"Service API",d:"公開したアプリやナレッジを、自分のプログラムから呼び出すためのREST APIの総称です。",r:"レッスン7"},
{t:"MCPサーバー",en:"MCP Server",d:"公開したアプリへMCP経由でアクセスする提供方法の1つです。",r:"レッスン6"},
{t:"ワークスペース",en:"Workspace",d:"アプリやメンバー、設定をまとめる作業単位。ログインするとまずワークスペースの中で作業します。",r:"共通"},
{t:"下書き（Draft）",en:"Draft",d:"編集中で、まだ公開していない状態。Current Draft とも呼ばれ、利用者には見えません。",r:"レッスン6"},
{t:"バージョン",en:"Version",d:"公開した時点の版。公開の履歴として残り、あとから確認できます。",r:"レッスン6"},
{t:"埋め込み",en:"Embed",d:"公開したアプリの画面を、自分のWebサイトなどの中に組み込んで使う公開方法です。",r:"レッスン6"},
{t:"Try it",en:"Try It",d:"APIドキュメントの画面で、その場でAPIを試せる機能。キーや値を入れて Send すると実際の応答が確認できます。",r:"レッスン7"},
{t:"Authorization",en:"Authorization",d:"APIリクエストで認証情報を送るヘッダーの名前。Difyでは Bearer 方式でAPIキーを送ります。",r:"レッスン7"},
{t:"Bearer",en:"Bearer",d:"「キーを持っている人が使える」という考え方の認証方式。Authorization: Bearer {APIキー} の形で書きます。",r:"レッスン7"},
{t:"ベースURL",en:"Base URL",d:"APIの入口になるアドレス。Dify Cloudでは https://api.dify.ai/v1 です。この後に機能ごとの宛先が続きます。",r:"レッスン7"},
{t:"エンドポイント",en:"Endpoint",d:"APIの機能ごとの宛先URL。チャット送信、アプリ情報の取得など、機能ごとに決まっています。",r:"レッスン7"},
{t:"JSON",en:"JSON",d:"プログラム同士がデータをやり取りするときの代表的な書式。「キーと値のペア」を波かっこで囲むような形で書きます。",r:"レッスン7"},
{t:"リクエスト",en:"Request",d:"APIへ送る「注文」のこと。宛先・認証・入力データなどをまとめて送ります。",r:"レッスン7"},
{t:"レスポンス",en:"Response",d:"リクエストに対してAPIから返ってくる「答え」。DifyではJSON形式で、回答文や会話IDなどが含まれます。",r:"レッスン7"},
{t:"response_mode",en:"Response Mode",d:"APIで応答の受け取り方を指定する項目。blocking は一括で受け取り、streaming は少しずつ受け取ります。",r:"レッスン7"},
{t:"トークン",en:"Token",d:"LLMが文章を読み書きするときの数え方の単位。文章の長さや料金の目安になります。",r:"共通"},
{t:"コンテキスト",en:"Context",d:"AIに問いと一緒に渡す参考情報や文脈のこと。ナレッジの検索結果を渡すのもコンテキストの一種です。",r:"レッスン5"},
{t:"ハルシネーション",en:"Hallucination",d:"AIが、もっともらしいけれど事実と違う内容を答えてしまうこと。ナレッジで正しい根拠を渡すと起きにくくなります。",r:"レッスン5"},
{t:"ログ",en:"Logs",d:"アプリがいつ・どう実行されたかの記録。うまく動かないときに、どこで止まったかを確認する手がかりになります。",r:"共通"}
];
const $=s=>document.querySelector(s);
function loadDone(){try{const v=JSON.parse(localStorage.getItem("dify-learn-v1")||"[]");if(!Array.isArray(v))return new Set();return new Set(v.filter(id=>LESSONS.some(l=>l.id===id)))}catch(e){return new Set()}}
let idx=0, done=loadDone();
let answers=new Array(QUIZ.length).fill(null);
let quizSeq=null,quizOrder=null;
function shuffledIdx(n){const a=[...Array(n).keys()];for(let k=a.length-1;k>0;k--){const r=Math.floor(Math.random()*(k+1));[a[k],a[r]]=[a[r],a[k]]}return a}
function freshQuiz(){quizSeq=shuffledIdx(QUIZ.length);quizOrder=QUIZ.map(it=>shuffledIdx(it.c.length))}
function save(){try{localStorage.setItem("dify-learn-v1",JSON.stringify([...done]))}catch(e){}renderProgress()}
function renderProgress(){$("#progText").textContent=`${done.size} / ${LESSONS.length} 完了`;$("#progBar").style.width=(done.size/LESSONS.length*100)+"%"}
function renderList(){$("#lessonList").innerHTML=LESSONS.map((l,i)=>`<li><button type="button" data-i="${i}" class="${i===idx?"active":""}" ${i===idx?'aria-current="true"':""}><span class="check">${done.has(l.id)?"✓":""}</span><span class="t">${i+1}. ${l.title}</span><span class="d">${l.desc}</span></button></li>`).join("");document.querySelectorAll("#lessonList button").forEach(b=>b.onclick=()=>{idx=+b.dataset.i;renderLesson()})}
function renderLesson(){const l=LESSONS[idx];$("#lessonMeta").textContent=l.num;$("#lessonTitle").textContent=l.title;$("#lessonLead").textContent=l.lead;$("#lessonBody").innerHTML=l.html;$("#lessonBody").scrollTop=0;$("#doneCheck").checked=done.has(l.id);$("#prevBtn").disabled=idx===0;$("#nextBtn").textContent=idx===LESSONS.length-1?"クイズへ →":"次へ →";renderList();renderProgress()}
$("#doneCheck").onchange=e=>{const l=LESSONS[idx];e.target.checked?done.add(l.id):done.delete(l.id);save();renderList()};
$("#prevBtn").onclick=()=>{if(idx>0){idx--;renderLesson()}};
$("#nextBtn").onclick=()=>{if(idx<LESSONS.length-1){idx++;renderLesson()}else{showQuiz()}};
$("#resetBtn").onclick=()=>{if(confirm("学習進捗をリセットしますか？")){done.clear();save();renderLesson()}};
function setView(name){const views={lesson:$("#lessonView"),quiz:$("#quizView"),gloss:$("#glossView")};const tabs={lesson:$("#btnLesson"),quiz:$("#btnQuiz"),gloss:$("#btnGloss")};for(const k in views){views[k].hidden=k!==name;tabs[k].classList.toggle("active",k===name);tabs[k].setAttribute("aria-pressed",k===name?"true":"false")}}
function showQuiz(){setView("quiz");renderQuiz()}
function showLesson(){setView("lesson")}
function showGloss(){setView("gloss");renderGloss()}
$("#btnQuiz").onclick=showQuiz;$("#btnLesson").onclick=showLesson;$("#btnGloss").onclick=showGloss;$("#backLesson").onclick=showLesson;$("#backLesson2").onclick=showLesson;
function renderGloss(){const q=($("#glossSearch").value||"").trim().toLowerCase();const hit=GLOSSARY.filter(g=>!q||g.t.toLowerCase().includes(q)||g.en.toLowerCase().includes(q)||g.d.toLowerCase().includes(q));$("#glossCount").textContent=q?`${hit.length}件ヒット（全${GLOSSARY.length}語）`:`全${GLOSSARY.length}語`;$("#glossBody").innerHTML=hit.length?hit.map(g=>`<div class="term"><h3>${g.t}<span class="en">${g.en}</span></h3><p>${g.d}</p><span class="rel">${g.r}</span></div>`).join(""):`<p class="no-hit">「${$("#glossSearch").value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}」に合う用語がありませんでした。別の言葉で試してください。</p>`}
$("#glossSearch").addEventListener("input",renderGloss);
function renderQuiz(){if(!quizSeq||!quizOrder)freshQuiz();const sc=$("#quizBody").scrollTop;$("#quizBody").innerHTML=quizSeq.map((qi,p)=>{const it=QUIZ[qi];return `<div class="q"><p>Q${p+1}. ${it.q}</p><div class="choices">${quizOrder[qi].map((oj,j)=>{const c=it.c[oj];let cls="";if(answers[qi]!==null){if(oj===it.a)cls="correct";else if(oj===answers[qi])cls="wrong"}return `<button type="button" data-q="${qi}" data-c="${oj}" class="${cls}" ${answers[qi]!==null?"disabled":""}>${["ア","イ","ウ","エ"][j]}. ${c}</button>`}).join("")}</div><div class="explain ${answers[qi]!==null?"show":""}">${answers[qi]===it.a?"正解です。":"残念、不正解です。"} ${it.e}</div></div>`}).join("");document.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>{const qi=+b.dataset.q;if(answers[qi]!==null)return;answers[qi]=+b.dataset.c;renderQuiz()});const answered=answers.filter(v=>v!==null).length,correct=answers.filter((v,i)=>v===QUIZ[i].a).length;$("#quizScore").textContent=answered?`回答 ${answered} / ${QUIZ.length} ・ 正解 ${correct}問`:"未回答";$("#quizBody").scrollTop=sc}
$("#quizRetry").onclick=()=>{answers=new Array(QUIZ.length).fill(null);quizSeq=null;quizOrder=null;renderQuiz();$("#quizBody").scrollTop=0};
renderLesson();
