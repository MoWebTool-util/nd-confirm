/**
 * Description: index.js
 * Author: crossjs <liwenfu@crossjs.com>
 * Date: 2014-12-15 21:20:26
 */

'use strict';

var $ = require('jquery'),
  Dialog = require('nd-dialog');

// Confirm
// -------
// Confirm 是一个有基础模板和样式的对话框组件。
var Confirm = Dialog.extend({

  attrs: {
    title: '默认标题',

    confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">确定</a>',
    cancelTpl: '<a class="ui-dialog-button-white" href="javascript:;">取消</a>',

    message: '默认内容',
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
    title: '确认框',
    afterHide: null
  };

  defaults = $.extend(null, defaults, options);

  if (instance) {
    instance.set(defaults);
  } else {
    instance = new Confirm(defaults);
  }

  if (onConfirm) {
    instance.off('confirm');
    instance.on('confirm', onConfirm);
  }

  if (onCancel) {
    instance.off('cancel');
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
