This is a template repo for Apprentices to use to store their notes and code that they accumulate while going through the bootcamp.

This template was created with the following bash command. Being ran in this directory

```bash
$ export PATH_TO_BOOTCAMP=<path-to-bootcamp>;tree -if  -L 3 -I node_modules $PATH_TO_BOOTCAMP | rg "docs.*\.md$" | rg --invert-match "addendum|_sidebar|README" | sed "s|^$PATH_TO_BOOTCAMP/docs/||" | sed 's|.md||' | xargs mkdir -p

$ tree -ifd | xargs -I {} touch "{}/.gitkeep"
```
