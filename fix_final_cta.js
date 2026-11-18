const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldPreFooterRegex = /<!-- =========================================================================\s*PRE-FOOTER CTA \("Let's build your AI advantage"\)[\s\S]*?<\/section>/;

const newPreFooter = `<!-- =========================================================================
         PRE-FOOTER CTA ("Let's build your AI advantage")
         ========================================================================= -->
    <section class="section-band bg-[#f9fafb] dark:bg-[#0B0F13] border-b border-[#ced6dd] dark:border-[#242E38] relative overflow-hidden">
      <div class="site-frame-1200">
        <!-- Central Dark Box (1200px wide, exactly like Figma) -->
        <div class="bg-[#1d252d] min-h-[547px] relative overflow-hidden flex flex-col justify-between text-center">
          
          <!-- Headline & Subheadline container -->
          <div class="pt-20 sm:pt-24 pb-8 px-6 flex flex-col items-center justify-center">
            <h2 class="archivo-heading text-[#eef2f5] text-4xl sm:text-5xl lg:text-[70px] font-[620] leading-[1.1] sm:leading-[69px] tracking-[-2.1px] max-w-4xl">
              Let's build your <br class="hidden sm:inline">AI advantage.
            </h2>

            <p class="font-sans font-normal text-base sm:text-lg text-[#eef2f5]/80 mt-6 sm:mt-7 max-w-lg leading-[30px]">
              Book a <strong class="font-bold text-white">free 30-minute consultation</strong>. We'll show you what's possible for your business.
            </p>
          </div>

          <!-- Bottom CTA Button Bar (Component 10: spans full width of the box at the bottom) -->
          <div class="cta-banner-btn cta-banner-consultation w-full bg-[#d22630] h-[105px] relative overflow-hidden flex items-center justify-center px-6 sm:px-12 cursor-pointer group select-none" onclick="openConsultationModal()">
            <!-- Smooth Orange Sweep Background -->
            <div class="cta-sweep-bg bg-[#f68d2e] absolute inset-0 origin-left scale-x-0 pointer-events-none"></div>

            <!-- Centered Inner Row (344px) -->
            <div class="cta-row-consultation relative z-10 w-full max-w-[344px] flex items-center justify-between">
              <span class="font-mono text-base sm:text-lg font-normal tracking-[1.65px] uppercase text-white whitespace-nowrap">
                Book My Free Consultation
              </span>
              <div class="cta-icon-box w-[42px] h-[41px] bg-[#eef2f5] rounded flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                <img src="assets/f54f5b9bd1123cee6a116cb4fab8b94bd6797d5d.svg" alt="" class="cta-icon-default absolute w-6 h-6" />
                <img src="assets/icon_arrow_orange.svg" alt="" class="cta-icon-hover absolute w-6 h-6" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>`;

if (oldPreFooterRegex.test(html)) {
  html = html.replace(oldPreFooterRegex, newPreFooter);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully replaced Pre-Footer CTA section in index.html!');
} else {
  console.error('Could not match oldPreFooterRegex');
}

