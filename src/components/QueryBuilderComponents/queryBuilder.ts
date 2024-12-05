export function useQueryBuilder(){
    function summarizeFilter(filter) {
      const operatorMap = {
        _eq: 'is equal to',
        _neq: 'is not equal to',
        _lt: 'is less than',
        _lte: 'is less than or equal to',
        _gt: 'is greater than',
        _gte: 'is greater than or equal to',
        _in: 'is in',
        _nin: 'is not in',
        _null: 'is null',
        _nnull: 'is not null',
        _contains: 'contains',
        _ncontains: 'does not contain',
        _icontains: 'contains (case-insensitive)',
        _starts_with: 'starts with',
        _nstarts_with: 'does not start with',
        _istarts_with: 'starts with (case-insensitive)',
        _nistarts_with: 'does not start with (case-insensitive)',
        _ends_with: 'ends with',
        _nends_with: 'does not end with',
        _iends_with: 'ends with (case-insensitive)',
        _niends_with: 'does not end with (case-insensitive)',
        _between: 'is between',
        _nbetween: 'is not between',
        _empty: 'is empty',
        _nempty: 'is not empty',
        _intersects: 'intersects',
        _nintersects: 'does not intersect',
        _intersects_bbox: 'intersects bounding box',
        _nintersects_bbox: 'does not intersect bounding box',
      };

      function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function (match) {
          return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          })[match];
        });
      }

      function helper(f) {
        if (f._and || f._or) {
          const logic = f._and ? '_and' : '_or';
          const connector = f._and ? '<strong class="text-sky-700"> and </strong>' : '<strong class="text-sky-700"> or </strong>';
          const expressions = f[logic]
            .map(helper)
            .filter(Boolean)
            .join(connector);
          return expressions.length > 1 ? `(${expressions})` : expressions;
        } else {
          return Object.entries(f)
            .filter(([k]) => k !== 'is_group')
            .map(([field, condition]) => {
              if (typeof condition === 'object' && !Array.isArray(condition)) {
                return Object.entries(condition)
                  .map(([op, val]) => {
                    const phrase = operatorMap[op] || op;
                    let valueStr = '';
                    if (Array.isArray(val)) {
                      const vals = val
                        .map((v) => `<span>${escapeHtml(v.toString())}</span>`)
                        .join(', ');
                      valueStr = `[${vals}]`;
                    } else if (val !== null && typeof val === 'object') {
                      valueStr = `<span>${escapeHtml(JSON.stringify(val))}</span>`;
                    } else if (val !== undefined) {
                      const value =
                        typeof val === 'string' ? `'${val}'` : val === null ? 'null' : val.toString();
                      valueStr = `<span>${escapeHtml(value)}</span>`;
                    }
                    const fieldStr = `<span class="field">${escapeHtml(field)}</span>`;
                    const operatorStr = `<span class="text-purple-800">${escapeHtml(phrase)}</span>`;
                    return `${fieldStr} ${operatorStr}${
                      valueStr ? ' ' + valueStr : ''
                    }`;
                  })
                  .join(' <strong class="text-sky-700">and</strong> ');
              } else {
                return `<span class="text-slate-500">${escapeHtml(field)}</span> ${escapeHtml(
                  condition
                )}`;
              }
            })
            .join(' <strong class="text-sky-700">and</strong> ');
        }
      }

      return helper(filter);
    }

    return {summarizeFilter}

}
