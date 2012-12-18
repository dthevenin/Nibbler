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
XTEMP = ../src/manage_template.sh 
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
COMPILE = $(JAVA) -jar ../src/closurecompiler/compiler.jar --language_in=ECMASCRIPT5
COMPILE_ADV = $(JAVA) -jar ../src/closurecompiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
COMPILE_YUI = $(JAVA) -cp ../src/yuicompressor/jargs-1.0.jar:../src/yuicompressor/rhino-1.6R7.jar -jar ../src/yuicompressor/yuicompressor-2.4.2.jar
GENDOC = $(JAVA) -jar ../src/jsdoc-toolkit/jsrun.jar ../src/jsdoc-toolkit/app/run.js 

###                         RELEASE
##############################################################

all :: debug

Debug :: debug
Release :: release

EXPORT_HEADER = "(function (exports, undefined) {"

EXPORT_FOOTER = "})(window);"


release :: clean_libs makedirs nibbler_tmp.js copy_xml
	-$(COMPILE) --js=nibbler_tmp.js --js_output_file=lib/nibbler.js

debug :: clean_libs makedirs nibbler_tmp.js copy_xml
	-$(MV) nibbler_tmp.js lib/nibbler.js

clean :: clean_libs

clean_libs:
	-$(RM_RF) lib/nibbler.js
	$(RM) vs_core_tmp.js
	$(RM) vs_data_tmp.js
	$(RM) vs_ui_tmp.js
	$(RM) vs_ext_tmp.js

makedirs:
	-$(MKPATH) lib/
	-$(MKPATH) lib/core/
	-$(MKPATH) lib/data/
	-$(MKPATH) lib/ui/
	-$(MKPATH) lib/ext/
	-$(MKPATH) lib/ext/ui/

nibbler_tmp.js :: vs_core_tmp.js vs_data_tmp.js vs_ui_tmp.js vs_ext_tmp.js
	$(ECHO) $(EXPORT_HEADER) >> $@
	$(CAT) src/nibbler_base.js >> $@
	$(CAT) vs_core_tmp.js >> $@
	$(CAT) vs_data_tmp.js >> $@
	$(CAT) vs_ui_tmp.js >> $@
	$(CAT) vs_ext_tmp.js >> $@
	$(ECHO) $(EXPORT_FOOTER) >> $@
	$(RM) vs_core_tmp.js
	$(RM) vs_data_tmp.js
	$(RM) vs_ui_tmp.js
	$(RM) vs_ext_tmp.js
	
copy_xml:
	$(CP) src/core/Array.xml lib/core/
	$(CP) src/data/GoogleSearch.xml lib/data/
	$(CP) src/ui/View.xml lib/ui/
	$(CP) src/ui/ScrollView.xml lib/ui/
	$(CP) src/ui/Application.xml lib/ui/
	$(CP) src/ui/ScrollImage.xml lib/ui/
	$(CP) src/ui/TextArea.xml lib/ui/
	$(CP) src/ui/Button.xml lib/ui/
	$(CP) src/ui/List.xml lib/ui/
	$(CP) src/ui/ComboBox.xml lib/ui/
	$(CP) src/ui/RadioButton.xml lib/ui/
	$(CP) src/ui/CheckBox.xml lib/ui/
	$(CP) src/ui/NavigationBar.xml lib/ui/
	$(CP) src/ui/TextLabel.xml lib/ui/
	$(CP) src/ui/ProgressBar.xml lib/ui/
	$(CP) src/ui/Slider.xml lib/ui/
	$(CP) src/ui/Image.xml lib/ui/
	$(CP) src/ui/TextInput.xml lib/ui/
	$(CP) src/ui/Switch.xml lib/ui/
	$(CP) src/ui/Picker.xml lib/ui/
	$(CP) src/ui/SegmentedButton.xml lib/ui/
	$(CP) src/ext/ui/GMap.xml lib/ext/ui/

###                     Core
##############################################################

vs_core_tmp.js: src/core/Array.js
	$(CAT) src/core/Array.js >> $@

###                         GUI
##############################################################

vs_ui_tmp.js: src/ui/View.js src/ui/Application.js src/ui/TextArea.js src/ui/Button.js src/ui/List.js src/ui/NavigationBar.js src/ui/ProgressBar.js src/ui/RadioButton.js src/ui/ComboBox.js src/ui/CheckBox.js src/ui/Slider.js src/ui/TextInput.js src/ui/TextLabel.js src/ui/Image.js src/ui/Switch.js src/ui/Picker.js src/ui/SegmentedButton.js src/ui/ScrollImage.js
	$(CAT) src/ui/View.js >> $@
	$(CAT) src/ui/ScrollView.js >> $@
	$(CAT) src/ui/Application.js >> $@
	$(CAT) src/ui/ScrollImage.js >> $@
	$(CAT) src/ui/TextArea.js >> $@
	$(CAT) src/ui/Button.js >> $@
	$(CAT) src/ui/List.js >> $@
	$(CAT) src/ui/ComboBox.js >> $@
	$(CAT) src/ui/RadioButton.js >> $@
	$(CAT) src/ui/CheckBox.js >> $@
	$(CAT) src/ui/NavigationBar.js >> $@
	$(CAT) src/ui/TextLabel.js >> $@
	$(CAT) src/ui/ProgressBar.js >> $@
	$(CAT) src/ui/Slider.js >> $@
	$(CAT) src/ui/Image.js >> $@
	$(CAT) src/ui/TextInput.js >> $@
	$(CAT) src/ui/Switch.js >> $@
	$(CAT) src/ui/Picker.js >> $@
	$(CAT) src/ui/SegmentedButton.js >> $@

###                     FX
##############################################################

	
###                     Data
##############################################################

vs_data_tmp.js: src/data/GoogleSearch.js
	$(CAT) src/data/GoogleSearch.js >> $@
	
###                     AV
##############################################################


###                     Extension
##############################################################

vs_ext_tmp.js: src/ext/ui/GMap.js
	$(CAT) src/ext/ui/GMap.js >> $@

