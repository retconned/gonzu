#!/bin/bash
 
###################################################
# Bash script to seed database 
###################################################


tsx prisma/seedWeapons.ts 
tsx prisma/seedAttachments.ts