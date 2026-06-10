# GitHub Projects Operating Guide

This repository uses issues as the source of truth for planned work and pull
requests as the record of delivered changes. Keep Project fields useful for
planning and labels useful for repository-wide classification and automation.

## Recommended fields

| Field | Type | Suggested values |
| --- | --- | --- |
| Status | Single select | Triage, Ready, In progress, In review, Blocked, Done |
| Priority | Single select | P0 Critical, P1 High, P2 Medium, P3 Low |
| Size | Single select | XS, S, M, L, XL |
| Iteration | Iteration | Use when planning in fixed cycles |
| Target date | Date | Use only when a real deadline exists |

Use the built-in assignee, milestone, repository, and linked pull request fields
instead of duplicating them as custom fields.

## Recommended views

| View | Layout and filter | Purpose |
| --- | --- | --- |
| Triage | Table, `status:Triage` | Clarify, prioritize, assign, or close new work |
| Delivery board | Board grouped by Status | Track active delivery |
| Roadmap | Roadmap grouped by milestone or iteration | Communicate planned outcomes |
| Bugs and risks | Table, `label:"type:bug"` | Focus on defects and operational risk |
| Recently done | Table, `status:Done` sorted by updated date | Review delivered work |

## Recommended workflows

1. Enable Auto-add for this repository with `is:issue`.
2. Set newly added items to `Triage`.
3. Set items to `Done` when their issue is closed or pull request is merged.
4. Automatically archive old `Done` items after an agreed retention period.

Auto-add is preferred over the `projects` key in issue forms because people
opening an issue need write access to a project for direct form-based addition
to succeed.

## Triage rules

1. Confirm the issue has a clear outcome and completion criteria.
2. Confirm or replace its `type:*` label.
3. Set Priority and Size in the Project.
4. Link dependencies and split work that is too large.
5. Move actionable work to `Ready`; close duplicate, invalid, or obsolete work.

## Label model

- `type:*` describes what kind of work the issue represents.
- `status:triage` marks new work that has not been fully reviewed.
- Project Status describes the delivery stage after the item enters the Project.

Avoid encoding Priority and delivery Status in both labels and Project fields.
Keeping one source of truth prevents conflicting values.
