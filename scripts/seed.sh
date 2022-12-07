#!/bin/bash
 
###################################################
# Bash script to seed database 
###################################################


tsx prisma/weapons/seedWeapons.ts 
tsx prisma/attachments/seedAttachments.ts