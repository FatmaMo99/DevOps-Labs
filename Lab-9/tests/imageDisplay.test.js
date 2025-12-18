/**
 * @jest-environment jsdom
 */

const { createNodejsImage, calculateScrollingTextDuration } = require('../src/imageDisplay');

describe('imageDisplay', () => {
    test('createNodejsImage creates a div element with correct classes', () => {
        const badge = createNodejsImage();

        expect(badge.tagName).toBe('DIV');
        expect(badge.className).toBe('project-badge');
        expect(badge.textContent).toBe('🚀 DevOps');
    });

    test('calculateScrollingTextDuration returns correct duration string', () => {
        const mockElement = { offsetWidth: 1000 };
        const duration = calculateScrollingTextDuration(mockElement);

        expect(duration).toBe('20s');
    });

    test('calculateScrollingTextDuration returns fallback duration for invalid input', () => {
        const duration = calculateScrollingTextDuration(null);

        expect(duration).toBe('20s');
    });
});
