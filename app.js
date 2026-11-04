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
<div class="callout">初学者はまずCloudで小さなアプリを1つ公開まで通すのがおすすめです。仕組みは後からレッスンごとに分けて学べます。</div>`},
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
<div class="callout">迷ったら：対話が続くなら Chatflow、1回で結果が返れば十分なら Workflow、が最初の判断軸です。</div>`},
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
<div class="callout">最初の1つは完璧を目指さず「入力 → LLM → 出力」を公開まで通すことを目標にすると、全体像がつかめます。</div>`},
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
<p>※ 上の <code>{{ }}</code> は説明のための表記です。実際の画面では変数ピッカーで挿入してください。</p>`},
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
<div class="callout">答えがおかしいときは、プロンプトの前にまず「検索で正しいチャンクが返っているか」を検索テストで確認するのが近道です。</div>`},
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
<div class="callout">誰に公開するか（社内だけか、URLを知る人か等）は利用環境の設定にも左右されます。公開範囲は公開前に必ず確認してください。</div>`},
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
<div class="callout"><strong>安全の鉄則：</strong>APIキーはサーバー側で保管し、ブラウザで動くコードや公開リポジトリに直接書かないでください。漏れると第三者に使われるおそれがあります。</div>`},
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
<p>ここまで終わったら、上の「クイズ」タブで12問の確認クイズに挑戦してください。</p>`}
];
const QUIZ=[
{q:"Difyの説明として正しいものはどれですか？",c:["画像編集だけを行うツール","AIアプリを画面操作で作り、WebやAPIで公開できるオープンソースのプラットフォーム","表計算ソフトの拡張機能","メールを送るだけのサービス"],a:1,e:"DifyはオープンソースのAIアプリ開発プラットフォームで、Studioで作ったアプリをWebアプリやAPIとして公開できます。"},
{q:"現在の公式ドキュメントで「主なアプリの種類」とされている組み合わせはどれですか？",c:["ChatbotとText Generatorだけ","WorkflowとChatflow","AgentとChatbotだけ","KnowledgeとAPIだけ"],a:1,e:"公式Key Conceptsでは、主な種類はWorkflowとChatflowとされています。基本タイプとしてChatbot・Agent・Text Generatorも選べます。"},
{q:"Workflowが向いている用途はどれですか？",c:["会話を何往復も続ける対話","1回で完結する要約・翻訳・バッチ処理","必ず会話変数を使う処理","画像の印刷"],a:1,e:"Workflowは単発（single-turn）のタスク向けです。会話の継続が必要ならChatflowを検討します。"},
{q:"Chatflowだけにある特徴として正しいものはどれですか？",c:["開始ノードが必ずTriggerになる","会話変数を保持・更新でき、LLMノードでメモリを使える","APIで呼び出せない","ノードを使わない"],a:1,e:"Chatflowは会話ごとに実行され、会話変数やメモリなどの会話向け機能があります。常にUser Inputから始まります。"},
{q:"最初のアプリ作成で、LLMを使う前に必要な設定はどれですか？",c:["APIキーを公開する","モデルプロバイダーを設定する","ナレッジを10個作る","セルフホストしなければならない"],a:1,e:"設定のモデルプロバイダーで使うLLMを用意しておく必要があります。これがないとLLMノードが動きません。"},
{q:"変数（Variable）の説明として正しいものはどれですか？",c:["文書を分ける単位のこと","情報を入れておき、名前で参照して後で使うための入れ物","公開用URLのこと","モデル料金の単位"],a:1,e:"公式Key Conceptsでは、変数は情報を保存し名前で参照するためのラベル付きコンテナと説明されています。"},
{q:"Chatflow専用の変数はどれですか？",c:["環境変数","システム変数 sys.user_id","会話変数（Conversation Variables）","入力変数"],a:2,e:"会話変数はChatflow専用で、1つの会話のターンをまたいで値を保持し、Variable Assignerで更新できます。"},
{q:"ナレッジ（RAG）で「チャンク」とは何ですか？",c:["APIキーの別名","文書を検索しやすく分けた小さな塊","会話の回数","モデルの種類"],a:1,e:"取り込んだ文書はチャンクという小さな塊に分けられ、質問に合うチャンクが検索されます。保存前にPreview Chunkで確認できます。"},
{q:"インデックス方法で、意味による検索ができる推奨設定はどれですか？",c:["Economical","High Quality","Trigger","Secret"],a:1,e:"High Qualityは埋め込みモデルを使って意味による検索ができ、公式入門でも推奨されています。Economicalはキーワード中心です。"},
{q:"Workflowで編集した内容が公開版に反映されないとき、まず疑うべきことはどれですか？",c:["モデルを変更していないこと","編集後に Publish Update をしていないこと","クイズに答えていないこと","ブラウザを変えていないこと"],a:1,e:"編集中はCurrent Draft（下書き）で、公開版はLatest Versionです。Publish → Publish Updateで下書きを公開版にする必要があります。"},
{q:"DifyのService APIでAPIキーについて正しいものはどれですか？",c:["全アプリ共通の1つのキーを使う","キーはアプリごとに作り、そのアプリ専用である","キーはブラウザのコードに書くのが推奨される","キーは不要である"],a:1,e:"アプリ用APIキーはアプリごとに作成し、そのアプリ専用です。Knowledge用キーとは別物です。"},
{q:"APIリクエストの認証ヘッダーとして正しい形はどれですか？",c:["API-Key: {キー} を本文に入れる","Authorization: Bearer {APIキー}","Cookieにキーを書く","URLの末尾にキーをそのまま公開する"],a:1,e:"認証は Authorization: Bearer {APIキー} のヘッダーで送ります。キーはサーバー側で保管してください。"}
];
const $=s=>document.querySelector(s);
function loadDone(){try{const v=JSON.parse(localStorage.getItem("dify-learn-v1")||"[]");if(!Array.isArray(v))return new Set();return new Set(v.filter(id=>LESSONS.some(l=>l.id===id)))}catch(e){return new Set()}}
let idx=0, done=loadDone();
let answers=new Array(QUIZ.length).fill(null);
function save(){localStorage.setItem("dify-learn-v1",JSON.stringify([...done]));renderProgress()}
function renderProgress(){$("#progText").textContent=`${done.size} / ${LESSONS.length} 完了`;$("#progBar").style.width=(done.size/LESSONS.length*100)+"%"}
function renderList(){$("#lessonList").innerHTML=LESSONS.map((l,i)=>`<li><button type="button" data-i="${i}" class="${i===idx?"active":""}" ${i===idx?'aria-current="true"':""}><span class="check">${done.has(l.id)?"✓":""}</span><span class="t">${i+1}. ${l.title}</span><span class="d">${l.desc}</span></button></li>`).join("");document.querySelectorAll("#lessonList button").forEach(b=>b.onclick=()=>{idx=+b.dataset.i;renderLesson()})}
function renderLesson(){const l=LESSONS[idx];$("#lessonMeta").textContent=l.num;$("#lessonTitle").textContent=l.title;$("#lessonLead").textContent=l.lead;$("#lessonBody").innerHTML=l.html;$("#lessonBody").scrollTop=0;$("#doneCheck").checked=done.has(l.id);$("#prevBtn").disabled=idx===0;$("#nextBtn").textContent=idx===LESSONS.length-1?"クイズへ →":"次へ →";renderList();renderProgress()}
$("#doneCheck").onchange=e=>{const l=LESSONS[idx];e.target.checked?done.add(l.id):done.delete(l.id);save();renderList()};
$("#prevBtn").onclick=()=>{if(idx>0){idx--;renderLesson()}};
$("#nextBtn").onclick=()=>{if(idx<LESSONS.length-1){idx++;renderLesson()}else{showQuiz()}};
$("#resetBtn").onclick=()=>{if(confirm("学習進捗をリセットしますか？")){done.clear();save();renderLesson()}};
function showQuiz(){$("#lessonView").hidden=true;$("#quizView").hidden=false;$("#btnLesson").classList.remove("active");$("#btnQuiz").classList.add("active");$("#btnLesson").setAttribute("aria-pressed","false");$("#btnQuiz").setAttribute("aria-pressed","true");renderQuiz()}
function showLesson(){$("#quizView").hidden=true;$("#lessonView").hidden=false;$("#btnQuiz").classList.remove("active");$("#btnLesson").classList.add("active");$("#btnQuiz").setAttribute("aria-pressed","false");$("#btnLesson").setAttribute("aria-pressed","true")}
$("#btnQuiz").onclick=showQuiz;$("#btnLesson").onclick=showLesson;$("#backLesson").onclick=showLesson;
function renderQuiz(){const sc=$("#quizBody").scrollTop;$("#quizBody").innerHTML=QUIZ.map((it,i)=>`<div class="q"><p>Q${i+1}. ${it.q}</p><div class="choices">${it.c.map((c,j)=>{let cls="";if(answers[i]!==null){if(j===it.a)cls="correct";else if(j===answers[i])cls="wrong"}return `<button type="button" data-q="${i}" data-c="${j}" class="${cls}" ${answers[i]!==null?"disabled":""}>${["ア","イ","ウ","エ"][j]}. ${c}</button>`}).join("")}</div><div class="explain ${answers[i]!==null?"show":""}">${answers[i]===it.a?"正解です。":"残念、不正解です。"} ${it.e}</div></div>`).join("");document.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>{const qi=+b.dataset.q;if(answers[qi]!==null)return;answers[qi]=+b.dataset.c;renderQuiz()});const answered=answers.filter(v=>v!==null).length,correct=answers.filter((v,i)=>v===QUIZ[i].a).length;$("#quizScore").textContent=answered?`回答 ${answered} / ${QUIZ.length} ・ 正解 ${correct}問`:"未回答";$("#quizBody").scrollTop=sc}
$("#quizRetry").onclick=()=>{answers=new Array(QUIZ.length).fill(null);renderQuiz();$("#quizBody").scrollTop=0};
renderLesson();
