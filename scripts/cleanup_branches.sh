# Branch Cleanup Script
# Generated on Wed Sep 10 13:12:21 UTC 2025
# Run this AFTER manual PR merges are complete

cd /home/runner/work/Chord-Lab/Chord-Lab

# Check if branches were merged successfully before deleting
echo 'Checking which branches can be safely deleted...'

# Category: score-interface
echo 'Checking score-interface branches...'
# Check if codex/define-score-interface-and-update-usestate is merged
if git merge-base --is-ancestor origin/codex/define-score-interface-and-update-usestate main; then
    echo '✅ Safe to delete: codex/define-score-interface-and-update-usestate'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/define-score-interface-and-update-usestate
else
    echo '⚠️  Keep: codex/define-score-interface-and-update-usestate (has unmerged changes)'
fi

# Check if codex/define-score-interface-and-update-usestate-8p1kgz is merged
if git merge-base --is-ancestor origin/codex/define-score-interface-and-update-usestate-8p1kgz main; then
    echo '✅ Safe to delete: codex/define-score-interface-and-update-usestate-8p1kgz'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/define-score-interface-and-update-usestate-8p1kgz
else
    echo '⚠️  Keep: codex/define-score-interface-and-update-usestate-8p1kgz (has unmerged changes)'
fi

# Category: guitar-diagram-refactor
echo 'Checking guitar-diagram-refactor branches...'
# Check if codex/refactor-guitarchorddiagram-styling is merged
if git merge-base --is-ancestor origin/codex/refactor-guitarchorddiagram-styling main; then
    echo '✅ Safe to delete: codex/refactor-guitarchorddiagram-styling'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/refactor-guitarchorddiagram-styling
else
    echo '⚠️  Keep: codex/refactor-guitarchorddiagram-styling (has unmerged changes)'
fi

# Category: guitar-diagram-extend
echo 'Checking guitar-diagram-extend branches...'
# Check if codex/extend-guitarchorddiagram-props-for-color is merged
if git merge-base --is-ancestor origin/codex/extend-guitarchorddiagram-props-for-color main; then
    echo '✅ Safe to delete: codex/extend-guitarchorddiagram-props-for-color'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/extend-guitarchorddiagram-props-for-color
else
    echo '⚠️  Keep: codex/extend-guitarchorddiagram-props-for-color (has unmerged changes)'
fi

# Check if codex/extend-guitarchorddiagram-props-for-color-v2 is merged
if git merge-base --is-ancestor origin/codex/extend-guitarchorddiagram-props-for-color-v2 main; then
    echo '✅ Safe to delete: codex/extend-guitarchorddiagram-props-for-color-v2'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/extend-guitarchorddiagram-props-for-color-v2
else
    echo '⚠️  Keep: codex/extend-guitarchorddiagram-props-for-color-v2 (has unmerged changes)'
fi

# Category: piano-diagram-refactor
echo 'Checking piano-diagram-refactor branches...'
# Check if codex/refactor-pianochorddiagram-to-use-pianodiagram is merged
if git merge-base --is-ancestor origin/codex/refactor-pianochorddiagram-to-use-pianodiagram main; then
    echo '✅ Safe to delete: codex/refactor-pianochorddiagram-to-use-pianodiagram'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/refactor-pianochorddiagram-to-use-pianodiagram
else
    echo '⚠️  Keep: codex/refactor-pianochorddiagram-to-use-pianodiagram (has unmerged changes)'
fi

# Category: shared-chord-data
echo 'Checking shared-chord-data branches...'
# Check if codex/create-shared-chord-data-module-9pajw3 is merged
if git merge-base --is-ancestor origin/codex/create-shared-chord-data-module-9pajw3 main; then
    echo '✅ Safe to delete: codex/create-shared-chord-data-module-9pajw3'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/create-shared-chord-data-module-9pajw3
else
    echo '⚠️  Keep: codex/create-shared-chord-data-module-9pajw3 (has unmerged changes)'
fi

# Check if codex/create-shared-chord-data-module-ot38i4 is merged
if git merge-base --is-ancestor origin/codex/create-shared-chord-data-module-ot38i4 main; then
    echo '✅ Safe to delete: codex/create-shared-chord-data-module-ot38i4'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/create-shared-chord-data-module-ot38i4
else
    echo '⚠️  Keep: codex/create-shared-chord-data-module-ot38i4 (has unmerged changes)'
fi

# Check if codex/create-shared-chord-data-module-v77wzc is merged
if git merge-base --is-ancestor origin/codex/create-shared-chord-data-module-v77wzc main; then
    echo '✅ Safe to delete: codex/create-shared-chord-data-module-v77wzc'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/create-shared-chord-data-module-v77wzc
else
    echo '⚠️  Keep: codex/create-shared-chord-data-module-v77wzc (has unmerged changes)'
fi

# Category: test-improvements
echo 'Checking test-improvements branches...'
# Check if codex/add-tests-for-genrequiz-component-vvhr2j is merged
if git merge-base --is-ancestor origin/codex/add-tests-for-genrequiz-component-vvhr2j main; then
    echo '✅ Safe to delete: codex/add-tests-for-genrequiz-component-vvhr2j'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/add-tests-for-genrequiz-component-vvhr2j
else
    echo '⚠️  Keep: codex/add-tests-for-genrequiz-component-vvhr2j (has unmerged changes)'
fi

# Category: unused-interface
echo 'Checking unused-interface branches...'
# Check if codex/remove-unused-practicechord-interface-6im880 is merged
if git merge-base --is-ancestor origin/codex/remove-unused-practicechord-interface-6im880 main; then
    echo '✅ Safe to delete: codex/remove-unused-practicechord-interface-6im880'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/remove-unused-practicechord-interface-6im880
else
    echo '⚠️  Keep: codex/remove-unused-practicechord-interface-6im880 (has unmerged changes)'
fi

# Check if codex/remove-unused-practicechord-interface-6qk0q3 is merged
if git merge-base --is-ancestor origin/codex/remove-unused-practicechord-interface-6qk0q3 main; then
    echo '✅ Safe to delete: codex/remove-unused-practicechord-interface-6qk0q3'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/remove-unused-practicechord-interface-6qk0q3
else
    echo '⚠️  Keep: codex/remove-unused-practicechord-interface-6qk0q3 (has unmerged changes)'
fi

# Check if codex/remove-unused-practicechord-interface-m2f32n is merged
if git merge-base --is-ancestor origin/codex/remove-unused-practicechord-interface-m2f32n main; then
    echo '✅ Safe to delete: codex/remove-unused-practicechord-interface-m2f32n'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/remove-unused-practicechord-interface-m2f32n
else
    echo '⚠️  Keep: codex/remove-unused-practicechord-interface-m2f32n (has unmerged changes)'
fi

# Category: quick-quiz-types
echo 'Checking quick-quiz-types branches...'
# Check if codex/define-quickquizquestion-generic-type is merged
if git merge-base --is-ancestor origin/codex/define-quickquizquestion-generic-type main; then
    echo '✅ Safe to delete: codex/define-quickquizquestion-generic-type'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/define-quickquizquestion-generic-type
else
    echo '⚠️  Keep: codex/define-quickquizquestion-generic-type (has unmerged changes)'
fi

# Check if codex/define-quickquizquestion-generic-type-6b98rf is merged
if git merge-base --is-ancestor origin/codex/define-quickquizquestion-generic-type-6b98rf main; then
    echo '✅ Safe to delete: codex/define-quickquizquestion-generic-type-6b98rf'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/define-quickquizquestion-generic-type-6b98rf
else
    echo '⚠️  Keep: codex/define-quickquizquestion-generic-type-6b98rf (has unmerged changes)'
fi

# Check if codex/define-quickquizquestion-with-generics is merged
if git merge-base --is-ancestor origin/codex/define-quickquizquestion-with-generics main; then
    echo '✅ Safe to delete: codex/define-quickquizquestion-with-generics'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/define-quickquizquestion-with-generics
else
    echo '⚠️  Keep: codex/define-quickquizquestion-with-generics (has unmerged changes)'
fi

# Category: piano-diagram-updates
echo 'Checking piano-diagram-updates branches...'
# Check if codex/update-pianochorddiagram-styles-and-structure is merged
if git merge-base --is-ancestor origin/codex/update-pianochorddiagram-styles-and-structure main; then
    echo '✅ Safe to delete: codex/update-pianochorddiagram-styles-and-structure'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/update-pianochorddiagram-styles-and-structure
else
    echo '⚠️  Keep: codex/update-pianochorddiagram-styles-and-structure (has unmerged changes)'
fi

# Check if codex/update-pianochorddiagram-with-new-key-layout is merged
if git merge-base --is-ancestor origin/codex/update-pianochorddiagram-with-new-key-layout main; then
    echo '✅ Safe to delete: codex/update-pianochorddiagram-with-new-key-layout'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/update-pianochorddiagram-with-new-key-layout
else
    echo '⚠️  Keep: codex/update-pianochorddiagram-with-new-key-layout (has unmerged changes)'
fi

# Category: guitar-diagram-styling
echo 'Checking guitar-diagram-styling branches...'
# Check if codex/update-guitarchorddiagram-styling is merged
if git merge-base --is-ancestor origin/codex/update-guitarchorddiagram-styling main; then
    echo '✅ Safe to delete: codex/update-guitarchorddiagram-styling'
    # Uncomment the next line to actually delete:
    # git push origin --delete codex/update-guitarchorddiagram-styling
else
    echo '⚠️  Keep: codex/update-guitarchorddiagram-styling (has unmerged changes)'
fi


# After verification, delete merged branches:
# git push origin --delete <branch-name>

# Clean up local branches:
# git remote prune origin
# git branch -r | grep 'origin/' | grep -v 'origin/main' | xargs -I {} git branch -rd {}
