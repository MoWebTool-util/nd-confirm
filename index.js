/**
 * @module Dialog
 * @author crossjs <liwenfu@crossjs.com>
 */

'use strict';

var $ = require('jquery');
var __ = require('nd-i18n');
var Dialog = require('nd-dialog');

// Confirm
// -------
// Confirm 是一个有基础模板和样式的对话框组件。
var Confirm = Dialog.extend({

  attrs: {
    className: 'ui-dialog-confirm',
    title: __('默认标题'),

    confirmTpl: '<a class="ui-dialog-button" href="javascript:;">' + __('确定') + '</a>',
    cancelTpl: '<a class="ui-dialog-button" href="javascript:;">' + __('取消') + '</a>',

    message: __('默认内容'),
    partial: require('./src/confirm.handlebars'),

    afterHide: 'destroy'
  },

  setup: function() {
    Confirm.superclass.setup.call(this);

    this.set('content', this.get('partial')({
      classPrefix: this.get('classPrefix'),
      message: this.get('message'),
      title: this.get('title'),
      confirmTpl: this.get('confirmTpl'),
      cancelTpl: this.get('cancelTpl'),
      hasFoot: this.get('confirmTpl') || this.get('cancelTpl')
    }));
  },

  events: {
    'click [data-role=confirm]': function(e) {
      e.preventDefault();
      this.trigger('confirm') !== false && this.hide();
    },
    'click [data-role=cancel]': function(e) {
      e.preventDefault();
      this.trigger('cancel') !== false && this.hide();
    }
  },

  _onChangeMessage: function(val) {
    this.$('[data-role=message]').html(val);
  },

  _onChangeTitle: function(val) {
    this.$('[data-role=title]').html(val);
  },

  _onChangeConfirmTpl: function(val) {
    this.$('[data-role=confirm]').html(val);
  },

  _onChangeCancelTpl: function(val) {
    this.$('[data-role=cancel]').html(val);
  }

});

var instance;

/*jshint maxparams:4*/
Confirm.show = function(message, onConfirm, onCancel, options) {
  var defaults = {
    message: message,
    title: __('请确认')
  };

  if (options) {
    $.extend(defaults, options);
  }

  if (instance) {
    instance.set(defaults);
    instance.off('confirm');
    instance.off('cancel');
  } else {
    instance = new Confirm(defaults).after('hide', function() {
      instance = null;
    });
  }

  if (onConfirm) {
    instance.on('confirm', onConfirm);
  }

  if (onCancel) {
    instance.on('cancel', onCancel);
  }

  return instance.show();
};

Confirm.hide = function() {
  if (instance) {
    instance.hide();
  }
};

module.exports = Confirm;
