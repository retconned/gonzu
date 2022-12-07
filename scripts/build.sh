# #!/bin/bash
#!/usr/bin/env bash

###################################################
# Bash script to generate and seed database
###################################################

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

    nvm use 16.14.0
    tsx prisma/weapons/generateWeapons.ts 
    tsx prisma/attachments/generateAttachments.ts
    tsx prisma/weapons/seedWeapons.ts 
    tsx prisma/attachments/seedAttachments.ts
    
    echo "💾 your database is ready to go."