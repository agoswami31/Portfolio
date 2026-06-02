/* global window */
// All content grounded in CV + live product pages. No invented metrics.
window.PORTFOLIO = {
  person: {
    name: "Aishwary Goswami",
    monogram: "AG",
    role: "Generative AI Engineer",
    place: "IntellifAI Labs · Toronto",
    headline: "I build generative-AI products, from the CUDA kernel up to the app someone opens.",
    sub: "Generative-AI engineer and founder. I work across the whole stack: diffusion and voice models, agents, inference optimization, and the consumer and developer products built on top of them.",
    email: "ashwary2000@gmail.com",
    phone: "+91 95098 25122",
    github: "github.com/agoswami31",
    githubUrl: "https://github.com/agoswami31",
    linkedin: "linkedin.com/in/aishwary-goswami",
    linkedinUrl: "https://www.linkedin.com/in/aishwary-goswami",
    calendly: "calendly.com/ashwary2000",
    calendlyUrl: "https://calendly.com/ashwary2000/25min",
    resume: "https://drive.google.com/file/d/1YHtypuCDhDF_jHR7kO71xez-IUpolZYv/view?usp=sharing",
  },

  // Qualitative, truthful proof points
  proof: [
    { n: "3", label: "products live with real users", note: "Gathos · KokoLearn · VividAI" },
    { n: "4", label: "countries I've worked in", note: "Canada · Germany · USA · South Korea" },
    { n: "50+", label: "builders I've mentored", note: "ML, deep learning & generative AI" },
    { n: "Full", label: "stack, end to end", note: "CUDA kernels to consumer product" },
  ],

  capabilities: [
    "Diffusion models", "Voice cloning / TTS", "Text-to-video", "LLM agents", "RAG",
    "LoRA · ControlNet · IP-Adapter", "ComfyUI pipelines", "vLLM", "TensorRT / ONNX",
    "CUDA programming", "KV-cache optimization", "Inference at scale", "FastAPI services",
    "Computer vision", "Multimodal generation",
  ],

  projects: [
    {
      id: "gathos",
      name: "Gathos",
      kicker: "Agent-native generative media API",
      year: "2026",
      url: "https://gathos.com",
      domain: "gathos.com",
      tag: "Developer platform · API",
      accent: "#bf4d28",
      summary:
        "One API for image, voice, and video, built to be called by agents and coding tools instead of clicked through a dashboard. Legible long-form text in images, zero-shot voice cloning in 600+ languages, and text-to-video with matching audio.",
      stack: ["Diffusion", "Zero-shot TTS", "Text-to-video", "FastAPI", "ComfyUI", "GPU inference"],
      cover: { kind: "api" },
      detail: {
        overview:
          "Gathos puts three things behind one REST API: image generation that can actually render long, legible text; voice cloning that works from a short sample across 600+ languages; and text-to-video with audio generated alongside it. The whole thing is meant to be driven by an agent or a coding tool, not a person clicking around a UI.",
        problem:
          "Generative-media APIs tend to fall apart on exactly the things an agent needs. Text inside images comes out garbled. Cloned voices drift between languages. Video and audio come from different vendors and have to be stitched together. And metered pricing makes cost impossible to predict once an automated loop starts calling the API on its own.",
        why:
          "Agents are starting to produce finished media, not just text. To do that without someone babysitting them, they need one media layer they can rely on and a bill that doesn't blow up the moment a loop runs overnight.",
        solution:
          "One agent-first API with opinionated defaults, so a model gets the call right the first time. The image pipeline is built around keeping text sharp and correctly placed. The voice model clones from a short clip and holds the same identity across languages. Text-to-video ships with generated audio. Pricing is flat monthly (Pro $18, Creator $45) so an agent's spend stays predictable.",
        role:
          "I built and shipped the generation and inference layer: the diffusion, voice, and video models plus the workflows that serve them. I also shaped the API so an agent can drive it, not just a person.",
        architecture:
          "A diffusion image backend with typography and region conditioning, a zero-shot voice-cloning model, and a text-to-video pipeline with an audio stage. ComfyUI graphs orchestrate the multi-step workflows, a FastAPI layer sits in front, and batched GPU workers handle inference. Grafana tracks GPU usage, latency, and health.",
        ai:
          "Diffusion with ControlNet and region control to keep text laid out correctly, IP-Adapter-style conditioning for consistency, speaker-embedding TTS for cross-lingual cloning, and text-to-video with a generated audio track. A single API call gets translated into a multi-node ComfyUI workflow under the hood.",
        challenges:
          "Getting long, correct text inside a generated image is still mostly an unsolved problem, and it shaped the whole conditioning design. Holding a cloned voice steady across 600+ languages was the other hard part. On top of that, serving three heavy modalities on shared GPUs while keeping latency reasonable under flat pricing set most of the engineering constraints.",
        product:
          "Built for agents before humans. Flat monthly pricing instead of metered, because predictable cost matters more than granular billing inside an automated loop. Defaults are opinionated so the common request just works.",
        scale:
          "Request batching on the GPUs, attention and KV-cache work for throughput, and TensorRT / ONNX paths for low-latency inference. Workers autoscale, and Grafana watches utilization, latency, and health.",
        lessons:
          "Building an API for agents is a different job than building one for people. A model needs failure modes it can read, defaults it can trust, and pricing it can reason about. Getting the unglamorous parts right, like text in images and voice identity, mattered more than any single model.",
        roadmap:
          "Tighter integrations with coding assistants and CLIs, finer control over generated video and audio, and more language and voice coverage.",
        impact:
          "Live with public Pro ($18/mo) and Creator ($45/mo) tiers, giving agents and developers one flat-rate layer for image, voice, and video instead of a stack of metered vendors.",
      },
    },
    {
      id: "kokolearn",
      name: "KokoLearn",
      kicker: "An AI tutor in your kid's world, narrated in your voice",
      year: "2026",
      url: "https://kokolearn.app",
      domain: "kokolearn.app",
      tag: "Consumer app · EdTech",
      accent: "#2f6f6a",
      summary:
        "Hand it a topic or a PDF and it builds a whole course: slides, quizzes, and narration, themed around whatever your kid is into and read aloud in the parent's own cloned voice.",
      stack: ["LLM lesson gen", "RAG (PDF)", "Voice cloning", "30+ languages", "Parent dashboard"],
      cover: { kind: "kids" },
      detail: {
        overview:
          "KokoLearn turns any subject or uploaded PDF into a full course for a child: slides, quizzes, challenges, and narrated audio. The twist is that every lesson is framed around whatever the kid is currently obsessed with, like cricket, dinosaurs, or baking, and can be read aloud in a voice cloned from their parent.",
        problem:
          "Most kids' apps teach every child the same lesson in the same flat, anonymous voice. Concepts stay abstract and don't stick, and parents have neither the time to build custom material nor any real way to stay involved.",
        why:
          "Kids learn fastest when something new is wrapped in something they already love and read by a voice they trust. That used to take a human tutor. Generative AI makes it possible to do it per-child, at scale.",
        solution:
          "A pipeline takes a topic or PDF, generates a structured course, and re-themes every example around the child's interests. The parent records a short voice sample once, and every lesson after that is narrated in their voice. A dashboard shows progress and where the child is struggling, and it all works in 30+ languages.",
        role:
          "Generative-AI work across the lesson-generation and voice pipelines: turning raw material into safe, structured, personalized lessons with narration.",
        architecture:
          "An LLM generates the course as structured output (slides, questions, challenges). RAG over the uploaded PDF or textbook keeps the content grounded. A voice-cloning TTS stage handles parent-voice narration, generation runs in 30+ languages, and an analytics layer feeds the parent dashboard.",
        ai:
          "LLMs generate and re-frame lessons around the child's interests, RAG ties everything back to the source material, zero- and few-shot voice cloning produces the parent's narration, and multilingual TTS covers the rest. Difficulty adapts per child.",
        challenges:
          "Keeping AI-generated lessons accurate and age-appropriate while bending every example toward the kid's chosen theme. Cloning a usable voice from a short recording. Supporting 30+ languages without quality falling apart. And clearing all of that at a bar where a wrong or unsafe lesson for a child is simply unacceptable.",
        product:
          "Parents stay in control: they pick subjects, upload material, and set the curriculum, while the AI does the teaching. There's a 24-hour no-card trial and a one-time $79 lifetime plan (up to 5 kids) instead of a subscription, because that's how families actually adopt this kind of thing.",
        scale:
          "Courses and audio are generated on demand per child and topic, with multilingual narration. Generated assets are cached and reused so repeated lessons stay fast and cheap.",
        lessons:
          "The personalization wasn't a feature, it was the product. The emotional part, a kid hearing their parent's voice, landed as hard as the teaching did. And with anything built for children, safety and factual grounding have to be in the first stage of the pipeline, not patched on later.",
        roadmap:
          "Smarter adaptive difficulty, deeper progress analytics for parents, and broader curriculum and language coverage.",
        impact:
          "Live, with a 24-hour free trial and a $79 lifetime plan covering up to 5 children: unlimited AI-generated, interest-themed, parent-narrated lessons in 30+ languages.",
      },
    },
    {
      id: "vividai",
      name: "VividAI",
      kicker: "AI creative studio for product & fashion",
      year: "2025",
      url: "https://vividai.in",
      domain: "vividai.in",
      tag: "Creator tool · E-commerce",
      accent: "#9a6a2f",
      summary:
        "A pay-as-you-go studio for ecommerce and brands: drop products into any scene, try outfits on a model, upscale, and (soon) turn stills into video. Campaign-ready visuals with no studio, crew, or design background.",
      stack: ["Diffusion", "IP-Adapter", "ControlNet", "Inpainting", "Credit billing"],
      cover: { kind: "fashion" },
      detail: {
        overview:
          "VividAI is a creative studio for brands and creators. It generates campaign-ready product and fashion visuals: dropping products into scenes, trying outfits on a model, upscaling, and turning stills into video, all through one guided workflow and billed by credits instead of a subscription.",
        problem:
          "Getting on-brand product and fashion imagery normally means a studio, a shoot, a crew, and design skills. That's slow and expensive for the constant stream of launches, drops, and campaigns that need fresh visuals. The AI tools that could help are scattered across platforms and locked behind subscriptions.",
        why:
          "Ecommerce, fashion, and marketing teams run on a steady supply of fresh, on-brand images. Turning a studio shoot into a few clicks, and only charging for what's generated, takes away the budget and headcount that usually gate small brands.",
        solution:
          "A focused set of tools (drop a product into any scene, try an outfit on a model, upscale, turn a still into video) inside one straightforward workflow. Pricing is credit-based with free daily trial credits, and credits from paid packs don't expire, so spend tracks actual use.",
        role:
          "Generative-AI work on the diffusion pipelines behind the product-swap, try-on, and upscaling tools.",
        architecture:
          "Diffusion and inpainting backends handle product placement and try-on. IP-Adapter and ControlNet keep the product or garment identity and pose intact. There's an upscaling stage, a credit-metering layer over the tools, and Razorpay for payments in the India market.",
        ai:
          "Diffusion with IP-Adapter for transferring product and garment identity, ControlNet for pose and structure, inpainting for clean compositing, and super-resolution for upscaling. It's the applied side of the LoRA / ControlNet / IP-Adapter fine-tuning I do day to day.",
        challenges:
          "For try-on and product swaps, the original product or garment has to stay recognizably itself while everything around it changes. That identity preservation is the entire job. Keeping results closer to final-quality than rough-draft across wildly varied user uploads was the main bar to clear.",
        product:
          "Credit-based, pay-for-what-you-use pricing instead of a subscription, with credits that don't expire, which matches the bursty, campaign-driven way brands actually work. Tools are sorted by industry and outcome so a non-technical user lands on the right one without a learning curve.",
        scale:
          "Per-generation diffusion inference with a credit-metering layer that ties GPU cost to usage, plus free trial credits to get people in before they spend anything.",
        lessons:
          "For creators, identity preservation and zero learning curve beat raw model novelty every time. And pricing turned out to be part of the product design: non-expiring credits removed the subscription anxiety that stops small brands from even starting.",
        roadmap:
          "Getting the image-to-video tool out of 'coming soon', and widening the catalogue of industry-specific workflows across fashion, ecommerce, gaming, and marketing.",
        impact:
          "Live, with free daily trial credits and credit packs via Razorpay, giving small brands and creators studio-grade visuals without a shoot, a crew, or a subscription.",
      },
    },
  ],

  stack: [
    {
      group: "Generative AI",
      items: ["Diffusion models", "Text-to-image", "Image-to-video", "Multimodal generation", "LoRA", "ControlNet", "IP-Adapter", "Fine-tuning", "Prompt engineering"],
    },
    {
      group: "LLMs & Agents",
      items: ["LLM agents (vLLM)", "Function calling", "Task decomposition", "RAG", "Transformers", "Embeddings", "BERT · T5 · LLaMA · Phi · Gemma"],
    },
    {
      group: "Inference & Acceleration",
      items: ["CUDA programming", "TensorRT", "ONNX Runtime", "Torch Compile", "PagedAttention", "KV-cache optimization", "Mixed precision (FP16/BF16)", "Model / data parallelism"],
    },
    {
      group: "Systems & Tooling",
      items: ["PyTorch", "TensorFlow", "HuggingFace", "Diffusers", "ComfyUI", "LangChain", "FastAPI · Flask", "Gradio", "Docker", "Grafana"],
    },
    {
      group: "Computer Vision",
      items: ["Object detection (YOLO)", "Image classification", "Video analysis", "Feature extraction", "OpenCV", "Camera calibration"],
    },
    {
      group: "Languages",
      items: ["Python", "C++", "SQL"],
    },
  ],

  experience: [
    {
      role: "Generative AI Engineer",
      org: "IntellifAI Labs",
      place: "Toronto, Canada",
      time: "Jan 2024 — Present",
      now: true,
      mono: "I",
      points: [
        "Built ML-Engineer and Marketing AI agents on a custom vLLM task-decomposition and function-calling pipeline.",
        "Productionized generative pipelines for image, video and audio using diffusion-based architectures.",
        "Built scalable ComfyUI inference workflows, improving latency, stability and throughput of multimodal systems.",
        "Fine-tuned Stable Diffusion with LoRA, ControlNet and IP-Adapters for domain-adapted outputs.",
        "Stood up Grafana monitoring for GPU utilization, latency and system health.",
      ],
    },
    {
      role: "AI Engineer",
      org: "Digital Product School (UnternehmerTUM)",
      place: "Munich, Germany",
      time: "Sep 2024 — Nov 2024",
      logo: "uploads/dps-logo.png",
      points: [
        "Designed an AI-driven pricing-intelligence system for complex enterprise workflows.",
        "Built LLM conversational agents on LLaMA 3.1 and Phi with custom datasets.",
        "Implemented RAG for improved factual accuracy; fine-tuned BERT, T5, BART and Gemma for response quality.",
      ],
    },
    {
      role: "Junior AI Engineer",
      org: "EMUQ TECH",
      place: "USA",
      time: "Aug 2023 — Dec 2023",
      logo: "uploads/emuq-logo.png",
      points: [
        "Developed transformer-based prompt-generation systems for AI-driven music composition.",
        "Contributed to a generative-AI platform enabling content creation via natural language.",
      ],
    },
    {
      role: "Software Engineer Intern — ML & Football Data Science",
      org: "Crosscert Inc.",
      place: "South Korea",
      time: "Sep 2022 — May 2023",
      logo: "uploads/crosscert-logo.png",
      points: [
        "Built computer-vision pipelines for player tracking in broadcast football footage.",
        "Implemented Hidden Markov Models for xG, EPV and Pitch-Control metrics.",
        "Applied YOLO multi-object detection and OpenCV camera calibration.",
      ],
    },
    {
      role: "Co-founder",
      org: "StarGent Robotics Community",
      place: "India",
      time: "May 2021 — May 2023",
      mono: "S",
      points: [
        "Co-founded an AI & robotics community focused on real-world intelligent systems.",
        "Led development of a humanoid robot integrating perception and interaction pipelines.",
        "Implemented facial recognition for personalized human-robot interaction.",
      ],
    },
  ],

  builder: {
    lead: "How I build",
    statement:
      "I'd rather ship a rough version to real users than polish a demo nobody touches. Find the real problem, build the smallest thing that proves it works, and let the feedback decide what comes next.",
    principles: [
      { t: "Ship first", d: "Three products live in a year. A rough edge real users hit teaches me more than a demo that never leaves my laptop." },
      { t: "Whole stack", d: "I work from CUDA kernels and inference up to the pricing page and onboarding. Products usually break in the gaps between those layers, so I own all of them." },
      { t: "AI does the work, people stay in charge", d: "My agents break tasks down and call tools, but a person, whether a parent, a brand, or a developer, always keeps the final say." },
      { t: "Boring correctness", d: "Readable text inside a generated image. A cloned voice that holds up across languages. Getting the unglamorous parts right is what makes any of it usable." },
    ],
  },

  more: [
    { t: "C-Detector", d: "Transfer-learning (VGG16) medical-imaging system that detects COVID-19 from scans." },
    { t: "Jenny", d: "NLP healthcare assistant that handles routine medical queries through chat." },
    { t: "GTA Runner", d: "Gameplay agent that drives the controls straight from computer vision and a neural net." },
  ],

  achievements: [
    "Mentored 50+ students in ML, deep learning and generative AI",
    "Trained 20+ students in Python and applied ML",
    "First runner-up, Blink-It Startup Ideathon",
    "Organizer, JECRC IT Hackathon 4.0 & inter-college programming contests",
  ],

  education: {
    school: "Jaipur Engineering College & Research Centre",
    degree: "B.Tech, Information Technology",
    time: "2019 — 2023",
    grade: "82%",
  },
};
