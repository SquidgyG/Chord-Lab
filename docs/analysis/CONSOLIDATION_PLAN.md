# Chord Lab Repository Consolidation Plan

## Current State Analysis

After comprehensive analysis, the repository has a **consolidation need**, not a cleanup need.

### Critical Finding
- **Main branch is incomplete**: Only contains CI workflow merge (1 commit)
- **All functionality lives in branches**: 45 branches with 88-269 commits each
- **NO branches are merged**: All contain unique work that should be preserved

## Immediate Actions Needed (Manual GitHub Operations)

### Priority 1: Merge Ready PRs
These PRs appear ready for immediate merge:

1. **PR #121** - Testing improvements and Playwright setup
   - ✅ Adds comprehensive testing framework
   - ✅ Improves chord diagram components
   - ✅ Removes outdated offline build system
   - 🎯 **Recommend: MERGE IMMEDIATELY**

2. **PR #120** - Piano chord theme color improvements
   - ✅ Small, focused improvement
   - ✅ No conflicts with other work
   - 🎯 **Recommend: MERGE**

3. **PR #119** - Shared piano diagram refactor
   - ✅ Code reuse improvement
   - 🎯 **Recommend: REVIEW & MERGE**

### Priority 2: Major Feature Consolidation

#### `feat/practice-enhancements` Branch (232 commits)
Contains major functionality that should be in main:
- Core practice mode features
- Enhanced UI components  
- Multiple feature implementations

**Recommendation**: Carefully review and merge - this appears to be the main application code.

#### `pr-121-manual-merge` Branch (263 commits)
Appears to be a manual merge attempt of PR #121 functionality.
**Recommendation**: Check if this duplicates PR #121, if so delete after PR #121 is merged.

## Automated Cleanup Plan

After manual merges are complete, these branches can likely be deleted:

### Codex Auto-Generated Branches (41 branches)
All `codex/*` branches appear to be AI-generated feature branches:
- Many are variations on similar themes (shared chord data, piano diagram updates)
- Multiple attempts at same features with different suffixes
- High likelihood of overlap with merged work

**Recommendation**: After key PRs are merged, systematically review and delete duplicate `codex/*` branches.

### Branch Categories for Cleanup:

1. **Duplicate shared chord data branches** (3 variations)
   - `codex/create-shared-chord-data-module-*`

2. **Piano diagram improvement branches** (6 variations)  
   - `codex/update-pianochorddiagram-*`
   - `codex/refactor-pianochorddiagram-*`

3. **Guitar diagram branches** (4 variations)
   - `codex/extend-guitarchorddiagram-*`
   - `codex/refactor-guitarchorddiagram-*`

4. **Test improvement branches** (3 variations)
   - `codex/add-tests-for-genrequiz-*`

## Implementation Steps

### Step 1: Manual GitHub Actions (Repository Owner)
1. Merge PR #121 (testing framework)
2. Merge PR #120 (piano theming)  
3. Review and merge PR #119 (shared piano diagram)
4. Merge PR #118 (piano styling improvements)
5. Review `feat/practice-enhancements` for core functionality
6. Merge other valuable feature PRs

### Step 2: Automated Branch Cleanup (After merges)
1. Verify merged functionality is working
2. Delete branches whose content is now in main
3. Keep any branches with unique unmerged features
4. Update documentation

## Risk Assessment

**LOW RISK** - Repository consolidation
- Main branch is minimal, so merging won't break existing functionality
- Branches contain progressive improvements
- Can be done incrementally

**MEDIUM RISK** - Branch deletion  
- Should only happen after confirming features are merged
- Keep branches with unique functionality

## Success Criteria

1. ✅ Main branch contains all production-ready functionality
2. ✅ Key features from feature branches are consolidated  
3. ✅ Duplicate/outdated branches are removed
4. ✅ Open PRs are resolved (merged or closed)
5. ✅ Repository has clean, maintainable branch structure

## Next Steps

**For Repository Owner:**
1. Review and merge Priority 1 PRs immediately
2. Carefully evaluate `feat/practice-enhancements` branch
3. Test merged functionality
4. Request automated cleanup of confirmed-merged branches

**Note**: This analysis revealed that the repository needs **consolidation** (bringing work into main) rather than **cleanup** (removing old work). The main branch is currently incomplete.