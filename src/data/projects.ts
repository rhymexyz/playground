export type Project = {
  slug: string;
  title: string;
  titleZh?: string;
  intro: string;
  introZh?: string;
  summary: string;
  summaryZh?: string;
  tools: string[];
  outcome: string;
  outcomeZh?: string;
  image: string;
  icon: string;
  detail: string[];
  detailZh?: string[];
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "first-things-first-ritual",
    title: "First Things First Ritual",
    titleZh: "第一件事仪式",
    intro: "A quiet ritual to do the hardest thing first.",
    introZh: "一个安静的仪式——先做最难的那件事。",
    summary:
      "A personal web ritual tool built around Brian Tracy's Eat That Frog — write down today's hardest task and its first bite, move through a 5-4-3-2-1 launch ritual, complete a body check-in after your focus round, and export the whole session as Markdown back to Obsidian.",
    summaryZh:
      "一个基于 Brian Tracy「吃掉那只青蛙」理念的个人网页仪式工具——写下今天最难的任务和第一口行动，经历 5-4-3-2-1 启动仪式，在专注轮结束后完成身体感受检查，并将整个会话导出为 Markdown 发回 Obsidian。",
    tools: ["HTML", "CSS", "JavaScript", "localStorage", "GitHub Pages"],
    outcome:
      "A single quiet loop from naming the frog to archiving the session — emphasising the first bite over finishing, with a body check-in built into the end of every round.",
    outcomeZh:
      "从命名青蛙到归档会话的完整安静闭环——强调第一口而非完成，每轮结束内置身体检查。",
    image: "/images/Eat that frog.png",
    icon: "Zap",
    liveUrl: "https://rhymexyz.github.io/frog-start-ritual/",
    detail: [
      "First Things First Ritual started from a simple friction point: knowing you should do the hardest thing first, but still finding your mind and body resisting. The missing piece wasn't another to-do list — it was a short ritual that could actually carry you across the threshold.",
      "The experience is a single linear flow: write down today's frog and the concrete first bite, optionally settle in with a five-minute meditation, then enter a cinematic 5-4-3-2-1 countdown that ends not with pressure but with a quiet reminder — the frog is chosen, the first bite is written, now just begin one round. Timer options split for real-world use: reach for your physical Pomodoro timer, or let the built-in 40-minute frog clock run.",
      "When the bell rings, the focus isn't on logging completion — it's on checking in with the body first. Quick-tap chips lower the barrier to writing, and a few short prompts capture what actually moved and how you returned when you wanted to escape. The whole session compresses into a structured Markdown block, ready to paste straight into Obsidian. It pairs naturally with the Meditation Companion: meditation handles the settling before action, the frog ritual locks that energy into a first bite and one focused round.",
    ],
    detailZh: [
      "「第一件事仪式」源于一个简单的阻力：明明知道应该先做最难的事，但身心依然抗拒。缺少的不是又一个待办清单，而是一个真正能把你带过门槛的短仪式。",
      "整个体验是一条单一的线性流程：写下今天的青蛙和具体的第一口行动，可选地用五分钟冥想沉淀自己，然后进入一段电影感的 5-4-3-2-1 倒计时——结束时不是压力，而是一个轻柔的提醒：青蛙已选定，第一口已写下，现在只需开始一轮。计时器分两种：拿起你实体的番茄钟，或让内置的 40 分钟青蛙时钟运行。",
      "铃声响起时，重点不在于记录完成情况，而在于先检查身体感受。快速点击的标签降低了书写门槛，几个简短提示捕捉了真正推动的事情，以及当你想逃跑时如何回来。整个会话压缩成一段结构化的 Markdown 块，可以直接粘贴进 Obsidian。它与冥想伴侣自然配对：冥想处理行动前的安定，青蛙仪式将那份能量锁定为第一口和一轮专注。",
    ],
    featured: true,
  },
  {
    slug: "meditation-companion",
    title: "Meditation Companion",
    titleZh: "冥想伴侣",
    intro: "A quiet, bilingual meditation guide.",
    introZh: "一个安静的双语冥想引导工具。",
    summary:
      "A personal meditation web app that meets you where you are: a few gentle guided questions surface your current state, an AI-generated meditation script is created just for you, and one tap produces a narrated audio session with optional ambient background.",
    summaryZh:
      "一个与你当下状态相遇的个人冥想网页应用：几个温和的引导问题呈现你的当前状态，为你生成一段专属 AI 冥想脚本，一键生成带朗读的音频会话，并可选搭配环境背景音。",
    tools: ["Next.js", "TypeScript", "React", "OpenAI API"],
    outcome:
      "A single private flow — from emotional check-in to editable script to downloadable guided audio — that stays calm and minimal on both mobile and desktop.",
    outcomeZh:
      "一条完整的私密流程——从情绪检查到可编辑脚本，再到可下载的引导音频——在移动端和桌面端保持平静简洁。",
    image: "/images/project-meditation-companion-cover.png",
    icon: "Wind",
    liveUrl: "https://meditationapp.vercel.app",
    detail: [
      "Meditation Companion grew from one question: what if calming down didn't have to start from a blank text box? Instead of asking you to describe how you feel from scratch, the app opens with a gentle conversational check-in — your current situation, how your body and emotions feel, any thought that keeps recurring. No empty canvas, just a few warm questions.",
      "The backend turns that free-text into a structured state card, which a separate orchestration layer uses to generate a meditation script tuned to your moment. You choose a focus direction (soothe, clarify, or take action), a narrator voice, session length, posture, and ambient sound. The script is fully editable before you generate audio — because sometimes the right word is yours, not the model's.",
      "The audio layer uses OpenAI TTS with natural pauses timed to the meditation rhythm, then mixes in optional ambient sounds (singing bowl, rain, ocean) and exports a WAV file you can keep. The whole loop — check in, generate, adjust, listen — takes under a minute. Access is currently protected by a passcode to keep API costs contained.",
    ],
    detailZh: [
      "冥想伴侣从一个问题出发：如果平静下来不必从空白文本框开始呢？应用不要求你从头描述感受，而是以温和的对话式检查开场——你当前的处境、身体和情绪的感觉、反复出现的念头。没有空白画布，只有几个温暖的问题。",
      "后端将自由文本转化为结构化状态卡，由独立的编排层生成一段贴合当下的冥想脚本。你可以选择专注方向（安抚、澄清或采取行动）、朗读者声音、会话时长、姿势和环境音。生成音频前脚本完全可编辑——因为有时候最合适的词是你的，而不是模型的。",
      "音频层使用 OpenAI TTS，配合冥想节奏的自然停顿，然后混入可选的环境音（颂钵、雨声、海浪），导出一个你可以保存的 WAV 文件。整个循环——检查、生成、调整、聆听——不超过一分钟。目前通过密码保护访问以控制 API 费用。",
    ],
    featured: true,
  },
];
