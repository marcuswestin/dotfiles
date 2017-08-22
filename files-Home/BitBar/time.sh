#!/bin/bash

fix_am_pm() {
	echo $1 | sed 's/AM/am/g' | sed 's/PM/pm/g'
}

NY="$(TZ='America/New_York' date +'%l:%M%p')"
CA="$(TZ='America/Los_Angeles' date +'%l:%M%p')"
VNAM="$(TZ='Vietname/Hanoi' date +'%l:%M%p')"
STR="NY `fix_am_pm $NY` - CA `fix_am_pm $CA` - VNAM `fix_am_pm $VNAM`"
echo $STR 