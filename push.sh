#!/bin/bash
npm run format
git add .
git commit -m "chap $1"
git push origin develop