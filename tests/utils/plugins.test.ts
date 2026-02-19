import { describe, it, expect, beforeEach } from 'vitest';
import { Validator, RuleError } from '@/index';

// Hilfsfunktion: DOM erzeugen
function createForm(html: string) {
  const container = document.createElement('form');
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
}

describe('Validator – custom rules & plugins', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers a global custom rule', () => {
    Validator.addRule('isFoo', (value) => {
      return value === 'foo' ? true : new RuleError('isFoo');
    });

    const form = createForm(`
      <input name="test" value="foo" data-rules="isFoo" />
    `);

    const v = new Validator(form);
    const result = v.validate();

    expect(result).toBe(true);
  });

  it('fails when global rule condition is not met', () => {
    Validator.addRule('isBar', (value) => {
      return value === 'bar' ? true : new RuleError('isBar');
    });

    const form = createForm(`
      <input name="test" value="foo" data-rules="isBar" />
    `);

    const v = new Validator(form);
    const result = v.validate();

    expect(result).toBe(false);
  });

  it('instance rule overrides global rule', () => {
    Validator.addRule('overrideRule', () => {
      return new RuleError('global_fail');
    });

    const form = createForm(`
      <input name="test" value="anything" data-rules="overrideRule" />
    `);

    const v = new Validator(form);

    // instance override
    v.addInstanceRule('overrideRule', () => true);

    const result = v.validate();

    expect(result).toBe(true);
  });

  it('supports plugin registration via Validator.use()', () => {
    const plugin = (ValidatorClass: typeof Validator) => {
      ValidatorClass.addRule('pluginRule', (value) => {
        return value === 'ok' ? true : new RuleError('pluginRule');
      });
    };

    Validator.use(plugin);

    const form = createForm(`
      <input name="test" value="ok" data-rules="pluginRule" />
    `);

    const v = new Validator(form);
    const result = v.validate();

    expect(result).toBe(true);
  });

  it('plugin rule fails correctly', () => {
    const plugin = (ValidatorClass: typeof Validator) => {
      ValidatorClass.addRule('pluginFail', () => {
        return new RuleError('pluginFail');
      });
    };

    Validator.use(plugin);

    const form = createForm(`
      <input name="test" value="whatever" data-rules="pluginFail" />
    `);

    const v = new Validator(form);
    const result = v.validate();

    expect(result).toBe(false);
  });

  it('built-in rules still work (regression test)', () => {
    const form = createForm(`
      <input name="test" value="5" data-rules="between:number,1,10" />
    `);

    const v = new Validator(form);
    const result = v.validate();

    expect(result).toBe(true);
  });
});
