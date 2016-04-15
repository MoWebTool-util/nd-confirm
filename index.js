/**
 * @module Dialog
 * @author crossjs <liwenfu@crossjs.com>
 */

'use strict';

var $ = require('nd-jquery');
var Dialog = require('nd-dialog');

// Confirm
// -------
// Confirm 是一个有基础模板和样式的对话框组件。
var Confirm = Dialog.extend({

  templatePartials: {
    content: require('./src/confirm.handlebars')
  },

  attrs: {
    className: 'ui-dialog-confirm',
    title: '默认标题',

    confirmTpl: '确定',
    cancelTpl: '取消',

    message: '默认内容',

    afterHide: 'destroy'
  },

  setup: function() {
    Confirm.superclass.setup.call(this);

    this.renderPartialTemplate('content', {
      classPrefix: this.get('classPrefix'),
      message: this.get('message'),
      title: this.get('title'),
      confirmTpl: this.get('confirmTpl'),
      cancelTpl: this.get('cancelTpl'),
      hasFoot: this.get('confirmTpl') || this.get('cancelTpl')
    });
  },

  events: {
    'click [data-role="confirm"]': function(e) {
      e.preventDefault();
      this.trigger('confirm') !== false && this.hide();
    },
    'click [data-role="cancel"]': function(e) {
      e.preventDefault();
      this.trigger('cancel') !== false && this.hide();
    }
  },

  _onChangeMessage: function(val) {
    this.$('[data-role="message"]').html(val);
  },

  _onChangeTitle: function(val) {
    this.$('[data-role="title"]').html(val);
  },

  _onChangeConfirmTpl: function(val) {
    this.$('[data-role="confirm"]').html(val);
  },

  _onChangeCancelTpl: function(val) {
    this.$('[data-role="cancel"]').html(val);
  }

});

var instance;

/*jshint maxparams:4*/
Confirm.show = function(message, onConfirm, onCancel, options) {
  var defaults = {
    message: message,
    title: '请确认'
    //confirmTpl: __('确定'),
    //cancelTpl: __('取消')
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
