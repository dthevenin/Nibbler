##############################################################
##                    COPYRIGHT NOTICE
##
## Copyright (C) 2009-2012. ViniSketch SARL (c) All rights reserved
##
## THIS SOURCE CODE, ALL THE INTELLECTUAL PROPERTY RIGHTS THAT IT
## CONTAINS, AND ALL COPYRIGHTS PERTAINING THERETO ARE THE EXCLUSIVE
## PROPERTY OF VINISKETCH.
##
## THIS SOURCE CODE SHALL NOT BE DISTRIBUTED, COPIED OR REPRODUCED IN
## FULL OR IN PART, NOR SHALL DERIVATIVE WORKS BE CREATED BASED ON THIS
## SOURCE CODE OR THE RELATED SPECIFICATION.
##
## THIS SOURCE CODE MAY BE USED OR COMPILED SOLELY FOR THE PURPOSE OF
## PORTING THE PRODUCT ONTO VENDOR'S SOLUTION. THIS SOURCE
## CODE MAY NOT BE MODIFIED, EVEN PARTIALLY.
##
## THE PRESENT COPYRIGHT NOTICE MAY NOT BE CHANGED NOR REMOVED FROM THE
## PRESENT FILE.
##############################################################

###                     Declaration 
##############################################################

SHELL = /bin/sh
CHMOD = chmod
CP = cp
XTEMP = ../lib/manage_template.sh 
MV = mv
NOOP = $(SHELL) -c true
RM_F = rm -f
RM_RF = rm -rf
TEST_F = test -f
TOUCH = touch
UMASK_NULL = umask 0
DEV_NULL = > /dev/null 2>&1
MKPATH = mkdir -p
CAT = cat
MAKE = make
OPEN = open
ECHO = echo
ECHO_N = echo -n
JAVA = java
COMPILE = $(JAVA) -jar ../lib/closurecompiler/compiler.jar --language_in=ECMASCRIPT5
COMPILE_ADV = $(JAVA) -jar ../lib/closurecompiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
COMPILE_YUI = $(JAVA) -cp ../lib/yuicompressor/jargs-1.0.jar:../lib/yuicompressor/rhino-1.6R7.jar -jar ../lib/yuicompressor/yuicompressor-2.4.2.jar
GENDOC = $(JAVA) -jar ../lib/jsdoc-toolkit/jsrun.jar ../lib/jsdoc-toolkit/app/run.js 

###                         RELEASE
##############################################################

all :: release

Debug :: debug
Release :: release

release :: clean makedirs vs util core ui fx data ext av export_api doc

debug :: clean makedirs vs_debug util_debug core_debug ui_debug fx_debug data_debug ext_debug av_debug export_api doc

clean :: clean_libs

clean_libs:
	-$(RM_RF) nibbler.js

makedirs:
	-$(MKPATH) ../kit/
	-$(MKPATH) ../kit/js/
	-$(MKPATH) ../kit/docs/
	-$(MKPATH) ../kit/css/
	-$(MKPATH) ../kit/resources/
	
EXPORT_HEADER = "(function (window, undefined) {"

EXPORT_FOOTER = "})(window);"


###                     Core
##############################################################

vs_core_tmp.js: core/Array.js
	$(CAT) core/Array.js >> $@

###                         GUI
##############################################################

vs_ui_tmp.js: lib/ui/View.js lib/ui/Application.js lib/ui/TextArea.js lib/ui/Button.js lib/ui/AbstractList.js lib/ui/List.js lib/ui/NavigationBar.js lib/ui/ToolBar/ToolBar.js lib/ui/ProgressBar.js lib/ui/RadioButton.js lib/ui/ComboBox.js lib/ui/CheckBox.js lib/ui/Slider.js lib/ui/TextInput.js lib/ui/TextLabel.js lib/ui/Image.js lib/ui/Switch.js lib/ui/Picker.js lib/ui/SegmentedButton.js
	$(CAT) lib/ui/View.js >> $@
	$(CAT) lib/ui/Application.js >> $@
	$(CAT) lib/ui/ScrollImageView.js >> $@
	$(CAT) lib/ui/TextArea.js >> $@
	$(CAT) lib/ui/Button.js >> $@
	$(CAT) lib/ui/List.js >> $@
	$(CAT) lib/ui/ComboBox.js >> $@
	$(CAT) lib/ui/RadioButton.js >> $@
	$(CAT) lib/ui/CheckBox.js >> $@
	$(CAT) lib/ui/NavigationBar.js >> $@
	$(CAT) lib/ui/ToolBar.js >> $@
	$(CAT) lib/ui/TextLabel.js >> $@
	$(CAT) lib/ui/ProgressBar.js >> $@
	$(CAT) lib/ui/Slider.js >> $@
	$(CAT) lib/ui/Image.js >> $@
	$(CAT) lib/ui/TextInput.js >> $@
	$(CAT) lib/ui/Switch.js >> $@
	$(CAT) lib/ui/Picker.js >> $@
	$(CAT) lib/ui/SegmentedButton.js >> $@

###                     FX
##############################################################

	
###                     Data
##############################################################

vs_data_tmp.js: data/GoogleSearch.js
	$(CAT) data/GoogleSearch.js >> $@
	
###                     AV
##############################################################


###                     Extension
##############################################################

vs_ext_tmp.js: ext/ui/GMap/GMap.js
	$(CAT) ext/ui/GMap/GMap.js >> $@

