# dsh-video-to-notes

Turn course, lecture, tutorial, documentary, meeting, and talk videos into structured study notes, inside DeepSeek Harness.

将视频（课程 / 讲座 / 教程 / 纪录片 / 会议 / 演讲等）自动转为高质量结构化学习笔记的 DSH 技能包。

**看视频 ≠ 学会。笔记才是真正属于你的知识。**

## Install

```bash
dsh plugin --profile web add dsh-video-to-notes
```

Restart DSH afterwards. The bundle applies one patch row and changes nothing else.

## What the bundle does

This package ships no runtime plugin logic. Its substance is a single Skill:

```
skills/video-to-notes/
├── SKILL.md                  skill instructions and routing description
├── scripts/transcribe.py     ffmpeg + Whisper speech-to-text
├── scripts/download_video.py yt-dlp network download
└── references/               note templates and the detailed workflow
```

`cordis.patch.yml` inserts one `@deepseek-ai/dsh-skill-filesystem` row that mounts the packaged `skills/` directory as an isolated provider (`includeDefaultRoots: false`), so this bundle contributes the `video-to-notes` skill without touching the project or user skill roots. The skill root resolves from the profile's own module resolution — the installed npm identity — never from a path concatenated onto `baseUrl`.

## Requirements

The skill drives local tools; DSH does not install them for you.

| Tool | Role | Install |
| --- | --- | --- |
| `python3` | runs the bundled scripts | `brew install python3` |
| `ffmpeg` / `ffprobe` | audio extraction, silence trimming, speed change | `brew install ffmpeg` |
| `openai-whisper` | speech recognition | `pip3 install openai-whisper` |
| `yt-dlp` | optional, only for video URLs | `pip3 install yt-dlp` |

The skill instructs the agent to detect missing dependencies, name them, and wait for your explicit confirmation before installing anything.

## What the skill does

1. **Detect dependencies** — reports exactly what is missing and asks before installing.
2. **Acquire the video** — a local path, or a URL downloaded with `yt-dlp` after you confirm the output directory.
3. **Transcribe** — Whisper with per-scenario defaults (`base` for ordinary videos, `turbo` for long ones, `--language zh` for Chinese, optional `--strip-silence` and `--speed` acceleration).
4. **Write the notes** — semantic chunking into a chapter outline, an optional Mermaid knowledge map for long content, ⭐/🔧/⚠️ emphasis markers, a closing quick-reference card, and a style matched to the content type (technical tutorial, classroom, talk, documentary).

Model choice, device selection (CUDA / Apple MPS / CPU), speed, and the note format are all decided by the skill; you only supply the video and any preferences.

## Privacy and copyright

Transcripts and notes can contain sensitive material — review and delete them when they are no longer needed. Downloading third-party video must respect the source platform's terms; use it for personal study.

## License

MIT
