#!/bin/bash
 
###################################################
# Bash script to generate needed files
###################################################


tsx prisma/generateWeapons.ts 
tsx prisma/generateAttachments.ts