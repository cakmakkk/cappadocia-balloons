// A trimmed copy of the official page's markup, for parser tests.

// Mirrors the markup of the live page (trimmed to the parts the parser reads).
function sectorBlock(id, flag, label) {
  return `
    <div class="sector-div"><div class="row">
      <div class="col-md-6"><ul class="sector-list">
        <li class="sector sector-black"><h3>SECTOR ${id} ${label}</h3></li>
        <li class="icon"><img src="../assets/flags/${flag}-flag.png" class="img-responsive"></li>
      </ul></div>
      <div class="col-md-6"><p class="sector-text">Message for ${id}.</p></div>
      <div class="col-md-12"><ul class="sector-bottom-list float-left">
        <li><h4>Date and hour of update <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:05</h4></li>
        <li><h4>Relevant date and margin of hours <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:30 - 07:30</h4></li>
      </ul></div>
    </div></div>`;
}

function secondaryBlock(n, flag) {
  return `
    <div class="col-md-6"><div class="second-left">
      <h4 class="not-fly-black">${n}.AREA</h4>
      <img src="../assets/flags/${flag}-flag.png" class="img-responsive flag-img">
      <p class="second-info">Info for area ${n}.</p>
      <ul class="second-sector-bottom-list float-left">
        <li><h4>Date and hour of update <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:05</h4></li>
        <li><h4>Relevant date and margin of hours <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:30 - 07:30</h4></li>
      </ul>
    </div></div>`;
}

export function page({ a, b, c }) {
  const code = { green: 1, yellow: 2, red: 3 };
  return `<html><body>
    ${sectorBlock('A', a, a === 'green' ? 'AVAILABLE' : 'NOT AVAILABLE')}
    ${sectorBlock('B', b, b === 'green' ? 'AVAILABLE' : 'NOT AVAILABLE')}
    ${sectorBlock('C', c, c === 'green' ? 'AVAILABLE' : 'NOT AVAILABLE')}
    ${secondaryBlock(2, 'red')}${secondaryBlock(3, 'green')}
    <script>
      sectorA = ${code[a]};
      sectorB = ${code[b]};
      sectorC = ${code[c]};
    </script>
  </body></html>`;
}
