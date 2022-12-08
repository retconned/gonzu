#!/bin/bash
 
###################################################
# Bash script to generate needed files
###################################################


tsx prisma/weapons/generateWeapons.ts 
tsx prisma/attachments/generateAttachments.ts