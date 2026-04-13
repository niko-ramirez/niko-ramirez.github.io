(function () {
    'use strict';

    var tree     = document.getElementById('skillTree');
    var svg      = document.getElementById('treeConnectors');
    var detail   = document.getElementById('treeDetail');
    var nodes    = tree.querySelectorAll('.tree-node');
    var activeNode = null;

    // ------- Draw SVG lines between parent → child -------

    function getCenter(el) {
        var hex  = el.querySelector('.node-hex');
        var rect = hex.getBoundingClientRect();
        var treeRect = tree.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - treeRect.left,
            y: rect.top  + rect.height / 2 - treeRect.top
        };
    }

    function drawConnectors() {
        while (svg.firstChild) svg.removeChild(svg.firstChild);

        nodes.forEach(function (node) {
            var parents = (node.dataset.parent || '').split(',').filter(Boolean);
            parents.forEach(function (pid) {
                var parent = tree.querySelector('[data-node="' + pid + '"]');
                if (!parent) return;

                var from = getCenter(parent);
                var to   = getCenter(node);

                var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', from.x);
                line.setAttribute('y1', from.y);
                line.setAttribute('x2', to.x);
                line.setAttribute('y2', to.y);

                var len = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
                line.style.setProperty('--line-len', len);

                var tierDelay = Number(node.closest('.tree-tier').dataset.tier) * 0.25;
                line.classList.add('connector-drawn');
                line.style.animationDelay = tierDelay + 's';
                line.style.strokeDasharray = len;
                line.style.strokeDashoffset = len;

                svg.appendChild(line);
            });
        });
    }

    // ------- Detail panel -------

    function showDetail(node) {
        if (activeNode) activeNode.classList.remove('node-active');
        activeNode = node;
        node.classList.add('node-active');

        document.getElementById('detailType').textContent   = node.dataset.type;
        document.getElementById('detailTitle').textContent  = node.dataset.title;
        document.getElementById('detailPeriod').textContent = node.dataset.period;
        document.getElementById('detailDesc').textContent   = node.dataset.desc;
        detail.setAttribute('data-active-type', node.dataset.type);
        detail.classList.add('detail-visible');
    }

    function hideDetail() {
        if (activeNode) activeNode.classList.remove('node-active');
        activeNode = null;
        detail.classList.remove('detail-visible');
    }

    // ------- Event listeners -------

    nodes.forEach(function (node) {
        node.addEventListener('click', function (e) {
            e.stopPropagation();
            if (activeNode === node) {
                hideDetail();
            } else {
                showDetail(node);
            }
        });
    });

    document.getElementById('detailClose').addEventListener('click', hideDetail);

    document.addEventListener('click', function (e) {
        if (detail.classList.contains('detail-visible') && !detail.contains(e.target)) {
            hideDetail();
        }
    });

    // ------- Init -------

    drawConnectors();

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawConnectors, 150);
    });
})();
