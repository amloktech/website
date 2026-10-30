'use client';

import { useState } from 'react';
import { siteLayout } from '@/lib/brand';

const viewports = [390, 768, 1024, 1440, 1920];
const contentWidth = (width: number) => Math.min(siteLayout.contentMax, width - 2 * (width < siteLayout.desktopBreakpoint ? siteLayout.compactGutter : siteLayout.desktopGutter));
const previousWidth = (width: number) => Math.min(1344, width - (width <= 760 ? 40 : 96));

export function BrandLayout() {
  const [viewport, setViewport] = useState(1440);
  const content = contentWidth(viewport);
  const margin = (viewport - content) / 2;
  return <div className="ds-layout-standard">
    <div className="ds-layout-facts"><div><strong>{siteLayout.contentMax}px</strong><span>Maximum content width</span></div><div><strong>{siteLayout.desktopGutter}px</strong><span>Minimum desktop margin</span></div><div><strong>{siteLayout.compactGutter}px</strong><span>Margin below {siteLayout.desktopBreakpoint}px</span></div></div>
    <div className="ds-layout-controls" role="group" aria-label="Layout preview screen width">{viewports.map(width => <button key={width} type="button" aria-pressed={viewport === width} onClick={() => setViewport(width)}>{width}px</button>)}</div>
    <div className="ds-layout-diagram" role="img" aria-label={`At ${viewport} pixels: ${content} pixels of content with ${margin} pixel margins on each side.`}>
      <div className="ds-layout-ruler"><span>{margin}px</span><strong>{content}px content</strong><span>{margin}px</span></div>
      <div className="ds-layout-model" style={{ paddingInline: `${margin / viewport * 100}%` }}>
        <div className="ds-layout-model-header"><b>AMLOK</b><span>Action</span></div>
        <div className="ds-layout-model-grid">{Array.from({length: viewport < 768 ? 4 : viewport < 1024 ? 8 : 12}, (_, index) => <i key={index}/>)}</div>
        <div className="ds-layout-model-row"><span/><span/></div>
        <div className="ds-layout-model-footer">Shared left and right edges</div>
      </div>
    </div>
    <p className="ds-note">Reference measured on <a href="https://www.sardine.ai/" target="_blank" rel="noreferrer">Sardine’s homepage</a>, October 21, 2026. Its 1,376px outer container includes 48px padding on each side, leaving 1,280px for content. Our tokens express that usable width directly.</p>
    <div className="ds-spec-scroll" role="region" tabIndex={0} aria-label="Previous and standard website width comparison"><table className="ds-spec-table"><thead><tr><th>Screen width</th><th>Previous AMLOK</th><th>New shared width</th><th>Side margin</th></tr></thead><tbody>{viewports.map(width=><tr key={width}><td>{width}px</td><td>{previousWidth(width)}px</td><td>{contentWidth(width)}px</td><td>{(width-contentWidth(width))/2}px</td></tr>)}</tbody></table></div>
  </div>;
}
