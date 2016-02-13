'use strict';

var Confirm = require('../index');
var expect = require('expect.js');
var $ = require('jquery');
var mask = require('nd-mask');

// require('../src/confirm.css');

/*globals describe,it,afterEach*/

describe('Confirm', function() {
  var example;

  afterEach(function() {
    if (example) {
      example.destroy();
      example = null;
    }
  });

  describe('normal usage', function() {

    it('should have message', function() {
      example = new Confirm({
        message: 'test message'
      });
      example.show();
      expect(example.get('message')).to.be('test message');
      expect(example.$('[data-role=message]').html()).to.be('test message');
      example.set('message', 'changed message');
      expect(example.$('[data-role=message]').html()).to.be('changed message');
    });

    it('should have title', function() {
      example = new Confirm({
        title: 'test title'
      });
      example.show();
      expect(example.get('title')).to.be('test title');
      expect(example.$('[data-role=title]').html()).to.be('test title');
      example.set('title', 'changed title');
      expect(example.$('[data-role=title]').html()).to.be('changed title');
    });

    it('should have confirm text', function() {
      var confirmTpl = '确xxx定';
      example = new Confirm({
        confirmTpl: confirmTpl
      });
      example.show();
      expect(example.get('confirmTpl')).to.be(confirmTpl);
      expect($.trim(example.$('[data-role=confirm]').html())).to.be(confirmTpl);
      example.set('confirmTpl', 'changed confirmTpl');
      expect($.trim(example.$('[data-role=confirm]').html())).to.be('changed confirmTpl');
    });

    it('should have cancel text', function() {
      var cancelTpl = '取xxx消';
      example = new Confirm({
        cancelTpl: cancelTpl
      });
      example.show();
      expect(example.get('cancelTpl')).to.be(cancelTpl);
      expect($.trim(example.$('[data-role=cancel]').html())).to.be(cancelTpl);
      example.set('cancelTpl', 'changed cancelTpl');
      expect($.trim(example.$('[data-role=cancel]').html())).to.be('changed cancelTpl');
    });
  });

  describe('show/hide', function() {

    it('should show dialog, and only show one dialog', function() {
      var msg = '';
      var instance = Confirm.show('foo', function() {
        msg = '点击了 confirm 按钮';
      });
      expect($('.ui-dialog').length).to.be(1);
      expect($('.ui-dialog [data-role="message"]').html()).to.be('foo');

      var instance2 = Confirm.show('bar', null, function() {
        msg = '点击了 cancel 按钮';
      });
      expect($('.ui-dialog').length).to.be(1);
      expect($('.ui-dialog [data-role="message"]').html()).to.be('bar');
      expect(instance2).to.be(instance);

      $('.ui-dialog [data-role="cancel"]').click();
      expect(msg).to.be('点击了 cancel 按钮');
      expect($('.ui-dialog').length).to.be(0);
    });

    it('should hide dialog', function() {
      var msg = '';
      Confirm.show('foo', function() {
        msg = '点击了 confirm 按钮';
      });

      Confirm.hide();
      Confirm.hide();
      expect($('.ui-dialog').length).to.be(0);
    });

    it('should has confirm callbacks', function() {
      var count = 0;
      Confirm.show('foo', function() {
        count = 1;
      });

      Confirm.show('bar', function() {
        count = 2;
      });

      $('.ui-dialog [data-role="confirm"]').click();

      expect(count).to.be(2);
      expect($('.ui-dialog').length).to.be(0);
    });

    it('should has cancel callbacks', function() {
      var count = 0;
      Confirm.show('foo', null, function() {
        count = 1;
      });

      Confirm.show('bar', null, function() {
        count = 2;
      });

      $('.ui-dialog [data-role="cancel"]').click();

      expect(count).to.be(2);
      expect($('.ui-dialog').length).to.be(0);
    });

  });

  describe('mask', function() {

    it('should not disappear when click mask', function() {
      example = new Confirm({
        content: 'foobar'
      });
      example.show();
      mask.element.click();
      expect(example.element.is(':visible')).to.be(true);
    });

    it('should disappear when click mask', function() {
      example = new Confirm({
        content: 'foobar',
        hideOnClickMask: true
      });
      example.show();
      mask.element.click();
      expect($('.ui-dialog').length).to.be(0);
    });

  });

});
