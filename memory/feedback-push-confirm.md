---
name: push-confirm
description: 推送代码前必须先询问用户确认
metadata:
  type: feedback
---

推送代码前必须先询问用户确认

**Why:** 用户表示改完后可能还不能完全满足需求，需要优化后再推送，不希望我直接推送。

**How to apply:** 每次执行 `git push` 之前，先向用户汇报当前修改内容，询问是否可以推送，得到明确同意后再执行。