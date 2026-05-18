const FULL_MOCK_CONFIG = {
    accessCode: "EMERALD123",
    agreementText: "I agree to take the test honestly and will not cheat or share materials.",
    maxViolations: 3,
    paths: {
        authPage: "../index.html",
        dashboardPage: "dashboard.html"
    },
    audioSrc: "../audio/mock1-listening.mp3",
    audioType: "audio/mpeg",
    sections: [
        { id: "listening", label: "Listening", durationSeconds: 30 * 60 },
        { id: "reading", label: "Reading", durationSeconds: 60 * 60 },
        { id: "writing", label: "Writing", durationSeconds: 60 * 60 }
    ],
    reading: {
        passages: [
            {
                title: "Reading Passage 1",
                bodyHtml: `
                    <h4>The domestication of horses</h4>
                    <p>
                        <strong>A</strong> Horses have been racing across the landscape for around 55 million years – 
much longer than our own species has existed. However, prehistoric remains 
show that at the end of the Ice Age, some 10,000 years ago, wild horses died 
out in the Americas and dwindled in western Europe, for reasons that are not 
clear. But they continued to thrive on the steps of eastern Europe and Central 
Asia, where short grasses and shrubs grow on vast, dry stretches of land. Most 
scholars believe it was here that people domesticated the horse. However, the 
DNA of domestic horses is very diverse. This suggests they may be descended 
from a number of different wild horse populations, in several locations.
                    </p>
                    <p>
                         <strong>B</strong> Once horses and humans encountered each other, our two species became 
powerfully linked. Humans domesticated horses some 6,000 years ago, and over 
time, we have created more than 200 breeds. The first domestic horses were 
likely to have been kept mainly as a source of food, rather than for work or for 
riding. There is evidence of horses being raised for meat in Kazakhstan, in Central 
Asia, around 5,500 years ago; later they began to pull chariots, and horseback 
riding became common in Afghanistan and Iran about 4,000 years ago. As we 
have shaped horses to suit our needs on battlefields, farms and elsewhere, these 
animals have shaped human history. The ways we travel, trade, play, work and 
f
ight wars have all been profoundly shaped by our use of horses.
                    </p>
                    <p>
                        <strong>C</strong> When people domesticate animals, they control their behavior in many ways. For 
example, animals that are being domesticated no longer choose their own mates. 
Instead, people control their breeding. Individuals with traits that humans prefer 
are more likely to produce offspring and pass on their genes. In the course of 
several generations, both the body and behavior of the animal are transformed. 
In the wild, animals that are well adapted to their environment live long and 
reproduce, while others die young. In this way, nature “chooses” the traits that 
are passed on to the next generation. This is the process of evolution by natural 
selection. Domestic animals also evolve, but people do the selecting. Humans 
seek out qualities like tameness, and help animals with those traits to survive and 
bear young. This is evolution by artificial selection. Most domestic animals are 
naturally social. Their wild ancestors lived in groups, with individuals responding 
to each other – some led, others followed. In domestic animals, the tendency to 
submit to others is especially strong. Generations of breeding have encouraged 
them to let people take the lead.
                    </p>
                    <p>
                       <strong>D</strong> For more than 3,000 years, a fighter on horseback or horse-drawn chariot was the 
ultimate weapon. Time after time, from Asia to Europe to the Americas, the use 
of horses has changed the balance of power between civilizations. When people 
with horses clashed with those without, horses provided a huge advantage. 
When both sides had horses, battles turned on the strength and strategy of their 
mounted horsemen, or cavalry. Horses continued to define military tactics well into 
the 1900s, until they finally became outmoded by machine guns, tanks, airplanes 
and other modern weapons.
                    </p>
                    <p>
                        <strong>E</strong> Horses are built for power. Their muscular bodies are heavier in the front than in 
the back, making them well balanced to pull heavy loads. Yet they can also be 
agile and quick – fit to carry out difficult tasks at top speed. So for more than a 
thousand years, people have called on the power of horses to cultivate the land 
and manage livestock.
                    </p>
                    <p>
                        <strong>F</strong> For most of human history, there was no faster way to travel over land than on 
a horse. When it comes to carrying people and their possessions, horses have 
two important advantages – they can run very fast and very far. Their speed 
and endurance are unusual for a creature so large, making them the most 
suitable animals to carry people and goods around the world. Horses offer other 
advantages as well. Since they eat grass, they can go almost anywhere that 
humans can, eating as they go. And unlike cows and camels, which must sit 
and rest to digest food, a horse’s digestive system allows it to graze and walk 
the whole day without stopping. By carrying people, goods and ideas between 
civilizations, horses changed history.
                    <p>
                        <strong>G</strong> Today’s horses are not used to carry soldiers into battle, and do not pull plows and 
stage-coaches as they once did. But horses are still part of our lives. Today the 58 
million horses in the world are used more for companionship, sport and recreation 
than for work and warfare.
                    </p>
                `
            },
            {
                title: "Reading Passage 2",
                bodyHtml: `
                    <h4>Business case study: Rebranding Shopper's Stop</h4>
                    <p>
                       On April 24, 2008, one of India’s oldest retail chains Shopper’s Stop Ltd unveiled its 
new logo as a part of its rebranding strategy. The chain undertook the rebranding 
exercise in a bid to go upmarket, and reposition itself as a ‘bridge to luxury’ store as 
opposed to its earlier image of a premium retailer. This would mean raising the already 
high quality of its products, and targeting more affluent consumers. Commenting on 
the change, B.S. Nagesh, Customer Care Associate and Managing Director, Shopper’s 
Stop, said, ‘Change is essential. Our consumers are changing; their preferences are 
constantly evolving. They are getting younger. And so, we have to change along with 
them. The change in identity is just the beginning of a wave of strategic movements 
being made in people, practices, introduction of new ways of shopping, technology, 
investment in customer relationship management, and analytics.’
                    </p>
                    <p>Shopper’s Stop was founded by K Raheja Corporation in October 1991, with its first 
store in Mumbai. From selling men’s ready-to-wear clothing it soon evolved into a 
complete family lifestyle store. As of 2008, Shopper’s Stop had 1.3 million square feet 
of retail space spread across 24 stores in 11 cities in India, with a retail turnover of over 
12.07 billion rupees (approx. US$245m)
                    </p>
                    <p>
                        According to analysts, in the mid-2000s Shopper’s Stop started to lose its market value 
as it failed to keep pace with changing customer preferences. It faced competition from 
several retailers such as Globus, Westside and Lifestyle, who were catering to the 
same segment of customers.
                    </p>
                    <p>
                       Changing consumer behaviour and the growing demand from youngsters for trendy 
products made Shopper’s Stop consider the option of rebranding itself. 
                    </p>
                    <p>
                        It conducted a series of workshops called ‘Trial Room’, to understand the preferences 
of groups of invited consumers. The workshops revealed that what was needed was a 
change in the look and feel of the brand. For Shopper’s Stop, rebranding meant not just 
a change of logo, but the execution of new business strategies, with the core principles 
remaining intact. According to Ravi Deshpande, Chief Creative Officer with Contract 
Advertising, the agency which designed the new campaign for Shopper’s Stop, ‘The 
retailer needed its brand idea to change, in order to connect to younger people. The 
purpose was also to cut the age of the brand, as fresh ideas do help in making people 
look differently at the brand.’
                    </p>
                    <p>
                        As a part of the rebranding efforts, Shopper’s Stop introduced a new rectangular logo 
designed by Ray+Keshavan. Though the logo was changed, the black and white colour 
scheme was retained. Govind Shrikhande, Customer Care Associate and Chief Executive of Shopper’s Stop, said, ‘It is more classical, rich, and authoritative – 
something Shopper’s customers connect with. Black and white gives us a strong brand 
recall value.’ The tagline was also changed from ‘Shopping and Beyond’ to ‘Start 
Something New’, which implied that customers should try out something different, and 
upgrade themselves according to the demands of the changing world.
                    </p>
                    <p>
                        As a part of its new philosophy of providing the customers with a new shopping 
experience, Shopper’s Stop came up with several initiatives. One plan was to increase 
the area of each store from around 40,000-45,000 square feet to 75,000-85,000 square 
feet. It also started a new concept in the retail industry by setting up trial rooms with day 
and night lighting options, so that consumers could check how garments would look 
during the day and in the night.
                    </p>
                    <p>
                        The other initiatives included a new dress code of black and white for the employees, 
and training sessions to help employees tackle demanding customers with varied 
tastes. Shopper’s Stop also introduced a company anthem for the staff, penned by 
renowned lyricist Gulzar, and sung by popular Indian singer Sonu Nigam. It was played 
every morning across all outlets in the country as a song of celebration. Shopper’s Stop 
brought out collectible shopping bags with different themes and launched the first in 
the series based on the theme ‘Fashion for the Age’. To make shopping an enjoyable 
experience for its customers, it launched an in-store radio station in association with 
Blue Frog Media, which aired popular melodies across all its stores in India, while radio 
presenters offered tips on fashion and wellness. It also planned to start its online portal 
by the end of 2008, to enable customers to shop online.
                    </p>
                    <p>In addition to these initiatives, Shopper’s Stop also started an environmental awareness 
campaign called ‘Think Green’. As part of this initiative, it planted more than 500 trees 
and distributed 1,500,000 seed sachets among its customers. Besides, a series of print 
and television commercials in black and white, with an environmental message that 
also conveyed Shopper’s Stop’s repositioning, were launched. 
                    </p>
                    <p>Shopper’s Stop planned to invest around 15 billion rupees to increase the number of 
outlets to 48 by 2011. It had earmarked 200 million rupees for the rebranding and 
repositioning exercise. But not everyone favoured the changes. Customers said that 
from their point of view, there was no major change in terms of price or special offers. 
Some analysts were of the view that the new logo had nothing unique to offer except for 
a change in shape. Some even wondered why the retailer had decided to rebrand itself, 
considering that it was doing reasonably well and had just completed a successful year.
                    </p>
                `
            },
            {
                title: "Reading Passage 3",
                bodyHtml: `
                    <h4>Re-evaluating the role of maps</h4>
                    <p>
                        <strong>A</strong> Maps vary enormously, from imposing images of the world and its parts to private 
jottings intended to give an approximate idea of the twentieth-century Antarctic. 
The materials on which maps are to be found, similarly range from scraps of 
paper to plaster walls, by way of parchment, copper coins, mosaics, marble, 
woollen tapestries, silk, gold and more. Attitudes towards maps also vary greatly, 
and are subject to modification over time.
                    </p>
                    <p>
                       <strong>B</strong> In recent decades, the view that maps should be assessed primarily in terms 
of their geometrical accuracy has radically changed. At the same time, they 
have become available to a range of disciplines. This development has been 
encouraged by the growing popularity of interdisciplinary studies and by the 
increasing awareness and appreciation of the importance of the visual – which 
may be a consequence of the spread of television and the internet, and the ease 
with which images can be created and manipulated in a digital environment. 
Academic historians of all types – social, political, diplomatic and fine art, literature 
specialists, and family historians take an interest in maps and find that they 
sometimes offer perspectives on their subjects that are not possible from other 
sources. 
                    </p>
                    <p>
                       <strong>C</strong> All have contributed to a re-evaluation of the subject. It is accepted that for 
some purposes, such as administration and terrestrial and maritime navigation, 
mathematical accuracy still plays a major and even sometimes a paramount role 
in cartography. In other contexts, such as maps of underground railway systems, 
or maps used for propaganda purposes, such accuracy is irrelevant, and at 
times even undesirable. Conversely, the very aspects that tended traditionally 
to be condemned or disregarded, such as distortions and decoration, become 
of enormous significance. They can give particularly precious insights into the 
mentalities of past ages, and the views and lives of their creators, as well as being 
packed with more general cultural information such as the receptiveness to 
artistic fashions.
                    </p>
                    <p>
                        <strong>D</strong> For many map enthusiasts the fascination of maps ironically stems from their 
necessary lack of truth. They can be regarded as the most successful pieces of 
f
iction ever to be created because most users instinctively suspend disbelief until 
they find that the map they are using does not give truthful information. Yet it has 
to be that way. Given the impossibility of representing the total reality, with all its 
complexity, on a flat surface, hard decisions have to be taken as to what features 
to select for accurate representation, or indeed for representation at all. For most of the time this process of selection is almost instinctive. The mapmaker knows 
the purpose he intends for his map, and beyond that he is unwittingly guided by 
the values and assumptions of the time in which he lives – unless these are in 
conflict with his own value systems, as was the case with Nicholas Philpot Leader 
in 1827. The map of Ireland (then part of the UK) that Leader commissioned was 
intended as a strong attack on the then British government.
                    </p>
                    <p>
                        <strong>E</strong> In order to meet the map’s purpose, the information that is represented will be 
prioritized according to importance as perceived by the mapmaker – and not 
necessarily in accordance with actual geographical size. Even on modern national 
topographic mapping, such features as motorways will be shown far larger than 
they actually are because they are important to drivers and users will expect 
to see them without difficulty. Conversely, large features that are considered 
unimportant might be completely ignored or reduced in size, like parks and other 
public spaces in some town maps. Often maps will show things that are invisible 
in the real world, such as relative financial affluence, as in Charles Booth’s maps 
of London in the nineteenth century, or the geology far below the surface of the 
planet, as in an 1823 map of the land around Bath. 
                    </p>
                    <p>
                        <strong>F</strong> Sometimes the purpose of the map is even simpler and has nothing to do with 
geography. The Hereford World Map proclaims the insignificance of man in the 
face of the divine and the eternal. The plan of Ostia harbour of AD 64 primarily 
serves as a demonstration of the Emperor Nero’s benevolence. Sometimes, as 
in depictions of the imaginary land of Utopia, physical reality is totally absent or 
so distorted as to be geographically meaningless. Instead the map serves as a 
commentary on the gap between the aspirations and the feeble achievements of 
mankind. The quality of a map must be judged by its ability to serve its purpose, 
and not simply by its scientific precision, and in that context aesthetic and design 
considerations are every bit as important as the mathematical, and often more so.
                    </p>
                    <p>
                        <strong>G</strong> Plainly, to interpret maps as having followed a path of ever-increasing scientific 
perfection over time is to miss the main point. In fact, they have responded to the 
mentalities, and met the requirements of the societies in which they have been 
created. In ancient Greece and Babylon, and in eighteenth- and twentieth-century 
Europe, the preoccupation with precision and the scientific indeed predominated. 
In early modern China and nineteenth-century Europe the administrative use of 
mapping came to the fore. By contrast, for long periods of time and in many 
civilizations, the major preoccupation was to define and to depict man’s place in 
relationship to a religious view of the universe. This was particularly evident in 
medieval Europe and Aztec Mexico. Clearly, maps can only be fully understood in 
their social context.
                    </p>
                `
            }
        ],
        groups: [
            {
                title: "Questions 1-13",
                start: 1,
                end: 13,
                guide: "Passage 1: The domestication of horses",
                bodyHtml: `
                    <p><strong>Questions 1-7</strong></p>
                    <p>Reading Passage 1 has seven paragraphs, <strong>A-G</strong>.</p>
                    <p><strong>Choose the correct heading for each paragraph from the list of headings below.</strong></p>
                    <p>Write the correct number, <strong>i-x</strong>, in boxes 1-7 on your answer sheet.</p>
                    <div class="reading-question-card">
                        <p class="reading-question-text"><strong>List of Headings</strong></p>
                        <p>i &nbsp; The fastest breeds of horses</p>
                        <p>ii &nbsp; Developing desirable characteristics</p>
                        <p>iii &nbsp; Playing a less essential role</p>
                        <p>iv &nbsp; Influencing the outcome of conflicts</p>
                        <p>v &nbsp; What different breeds do best</p>
                        <p>vi &nbsp; A wide range of uses for domestic horses</p>
                        <p>vii &nbsp; Horses in agriculture</p>
                        <p>viii &nbsp; An ancient species</p>
                        <p>ix &nbsp; An ideal form of transport</p>
                        <p>x &nbsp; What the earliest horses looked like</p>
                    </div>
                    ${[1,2,3,4,5,6,7].map((q, i) => `<div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">${q}</span> Section ${String.fromCharCode(65 + i)}</p>${readingInput(`rq${q}`)}</div>`).join("")}

                    <p><strong>Questions 8-10</strong></p>
                    <p><strong>Do the following statements agree with the information given in Reading Passage 1?</strong></p>
                    <p>In boxes 8-10 on your answer sheet, write</p>
                    <p><strong>TRUE</strong> if the statement agrees with the information</p>
                    <p><strong>FALSE</strong> if the statement contradicts the information</p>
                    <p><strong>NOT GIVEN</strong> if there is no information on this</p>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">8</span> The last of the wild horses lived around 10,000 years ago.</p>${readingInput("rq8")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">9</span> Initially people probably used domesticated horses to supplement their diet.</p>${readingInput("rq9")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">10</span> Methods of artificial selection have changed over the centuries.</p>${readingInput("rq10")}</div>

                    <p><strong>Questions 11-13</strong></p>
                    <p><strong>Complete the sentences below.</strong></p>
                    <p>Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage for each answer.</p>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">11</span> Having greater weight at the ______ helps horses to pull heavy items.</p>${readingInput("rq11")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">12</span> As well as being quicker, horses have greater ______ than most other large animals.</p>${readingInput("rq12")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">13</span> Because of the way their ______ works, horses can keep moving all day long.</p>${readingInput("rq13")}</div>
                `
            },
            {
                title: "Questions 14-26",
                start: 14,
                end: 26,
                guide: "Passage 2: Rebranding Shopper's Stop",
                bodyHtml: `
                    <p><strong>Questions 14-19</strong></p>
                    <p><strong>Complete each sentence with the correct ending, A-I, below.</strong></p>
                    <p>Write the correct letter, <strong>A-I</strong>, in boxes 14-19 on your answer sheet.</p>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">14</span> In rebranding, Shopper’s Stop’s objective was to attract</p>${readingInput("rq14")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">15</span> The mid-2000s saw an alteration in</p>${readingInput("rq15")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">16</span> In the mid-2000s young people were increasingly interested in buying</p>${readingInput("rq16")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">17</span> Workshops showed that Shopper’s Stop needed to modify</p>${readingInput("rq17")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">18</span> The new advertising campaign was intended to give the Shopper’s Stop brand</p>${readingInput("rq18")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">19</span> The new tagline was intended to encourage consumers to buy</p>${readingInput("rq19")}</div>
                    <div class="reading-question-card">
                        <p><strong>A</strong> its brand image</p>
                        <p><strong>B</strong> designs that were popular in other parts of the world</p>
                        <p><strong>C</strong> customers who had stayed loyal to the company</p>
                        <p><strong>D</strong> the items that consumers tended to buy</p>
                        <p><strong>E</strong> products that they hadn’t tried before</p>
                        <p><strong>F</strong> a younger image</p>
                        <p><strong>G</strong> the shape of the logo</p>
                        <p><strong>H</strong> customers with more money to spend</p>
                        <p><strong>I</strong> fashionable goods</p>
                    </div>

                    <p><strong>Questions 20-22</strong></p>
                    <p><strong>Do the following statements agree with the information given in Reading Passage 2?</strong></p>
                    <p>In boxes 20-22 on your answer sheet, write</p>
                    <p><strong>TRUE</strong> if the statement agrees with the information</p>
                    <p><strong>FALSE</strong> if the statement contradicts the information</p>
                    <p><strong>NOT GIVEN</strong> if there is no information on this</p>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">20</span> When Shopper's Stop first opened it sold products for all the family.</p>${readingInput("rq20")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">21</span> Shopper's Stop and Globus targeted similar sections of the market.</p>${readingInput("rq21")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">22</span> The advertising campaign was used to launch new products.</p>${readingInput("rq22")}</div>

                    <p><strong>Questions 23-24</strong></p>
                    <p><strong>Choose TWO letters, A-E.</strong></p>
                    <p>Which <strong>TWO</strong> of the following activities were among Shopper’s Stop’s initiatives to help customers?</p>
                    <div class="reading-question-card">
                        <p><strong>A</strong> redecorating its stores</p>
                        <p><strong>B</strong> changing the lighting in certain areas of its stores</p>
                        <p><strong>C</strong> recruiting additional staff</p>
                        <p><strong>D</strong> offering online fashion advice</p>
                        <p><strong>E</strong> broadcasting music throughout the stores</p>
                    </div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">23</span> First letter</p>${readingInput("rq23")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">24</span> Second letter</p>${readingInput("rq24")}</div>

                    <p><strong>Questions 25-26</strong></p>
                    <p><strong>Choose TWO letters, A-E.</strong></p>
                    <p>Which <strong>TWO</strong> of the following comments are reported about Shopper’s Stop’s rebranding?</p>
                    <div class="reading-question-card">
                        <p><strong>A</strong> The company had spent too much on the rebranding.</p>
                        <p><strong>B</strong> The company lost customers to its competitors because of the rebranding.</p>
                        <p><strong>C</strong> The rebranding did not save consumers money.</p>
                        <p><strong>D</strong> The logo was too similar to some other companies’ logos.</p>
                        <p><strong>E</strong> The rebranding was unnecessary at that time.</p>
                    </div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">25</span> First letter</p>${readingInput("rq25")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">26</span> Second letter</p>${readingInput("rq26")}</div>
                `
            },
            {
                title: "Questions 27-40",
                start: 27,
                end: 40,
                guide: "Passage 3: Re-evaluating the role of maps",
                bodyHtml: `
                    <p><strong>Questions 27-31</strong></p>
                    <p>Reading Passage 3 has seven paragraphs, <strong>A-G</strong>.</p>
                    <p><strong>Which paragraph contains the following information?</strong></p>
                    <p>Write the correct letter, <strong>A-G</strong>, in boxes 27-31 on your answer sheet.</p>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">27</span> Examples of maps showing features that cannot be seen on the ground.</p>${readingInput("rq27")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">28</span> A list of media that have been used in the creation of maps.</p>${readingInput("rq28")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">29</span> Examples of the main function of maps in various periods and places.</p>${readingInput("rq29")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">30</span> A contrast between different types of maps with regard to a requirement for accuracy.</p>${readingInput("rq30")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">31</span> Speculation about reasons for a change in attitudes towards maps.</p>${readingInput("rq31")}</div>

                    <p><strong>Questions 32-39</strong></p>
                    <p><strong>Match each map with the correct purpose, A-I.</strong></p>
                    <p>Write the correct letter, <strong>A-I</strong>, in boxes 32-39 on your answer sheet.</p>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">32</span> maps of Utopia</p>${readingInput("rq32")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">33</span> Charles Booth’s maps of London</p>${readingInput("rq33")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">34</span> map commissioned by Nicholas Philpot Leader</p>${readingInput("rq34")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">35</span> map of Bath area</p>${readingInput("rq35")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">36</span> early modern Chinese maps</p>${readingInput("rq36")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">37</span> map of the Antarctic</p>${readingInput("rq37")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">38</span> plan of Ostia harbour</p>${readingInput("rq38")}</div>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">39</span> Hereford World Map</p>${readingInput("rq39")}</div>
                    <div class="reading-question-card">
                        <p><strong>A</strong> to portray an area very roughly</p>
                        <p><strong>B</strong> to create a decorative work</p>
                        <p><strong>C</strong> to express political criticism</p>
                        <p><strong>D</strong> to show variations in wealth</p>
                        <p><strong>E</strong> to show differences below ground level</p>
                        <p><strong>F</strong> to show the unimportance of human beings</p>
                        <p><strong>G</strong> to glorify the ruler of the country</p>
                        <p><strong>H</strong> to contrast ideal and actual human development</p>
                        <p><strong>I</strong> to assist in the management of the country</p>
                    </div>

                    <p><strong>Question 40</strong></p>
                    <p><strong>Choose the correct letter, A, B, C or D.</strong></p>
                    <div class="reading-question-card"><p class="reading-question-text"><span class="number-tag">40</span> What is the best title for Reading Passage 3?</p>${readingInput("rq40")}</div>
                    <div class="reading-question-card">
                        <p><strong>A</strong> Differences in map-making around the world</p>
                        <p><strong>B</strong> A growing interest in drawing maps</p>
                        <p><strong>C</strong> Re-evaluating the role of maps</p>
                        <p><strong>D</strong> Making maps more accurate</p>
                    </div>
                `
            }
        ]
    },
    writing: {
        tasks: [
            {
                label: "Task 1",
                heading: "Academic Writing Task 1",
                subheading: "Replace this prompt with your Task 1 resource.",
                minWords: 150,
              promptHtml: `
    <div class="instruction-box">
        <p>
            <strong>Task prompt:</strong>
            The graph below shows the percentage of people visiting the gym once a month or more between 1984 and 2003.
        </p>

        <p>
            <strong>Instructions:</strong>
            Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
        </p>

        <p><strong>Write at least 150 words.</strong></p>
    </div>

    <div class="task-visual-card">
        <img
            src="../images/mock1.jpg"
            alt="Task 1 visual"
            class="task-visual"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div class="task-visual-placeholder">
           
        </div>
    </div>
`

            },
            {
                label: "Task 2",
                heading: "Academic Writing Task 2",
                subheading: "Replace this prompt with your Task 2 resource.",
                minWords: 250,
             promptHtml: `
    <div class="instruction-box">
        <p class="essay-statement">
            Some people believe that the best way to make road transport safer is to require drivers to take a driving test every year.
        </p>

        <p class="essay-question">
            To what extent do you agree or disagree?
        </p>

        <p>
            <strong>Instructions:</strong>
            Give reasons for your answer and include any relevant examples from your own knowledge and experience.
        </p>

        <p><strong>Write at least 250 words.</strong></p>
    </div>

    <div class="task-note-box">
        <h4>Quick Structure</h4>
        <p>Introduction</p>
        <p>Body Paragraph 1</p>
        <p>Body Paragraph 2</p>
        <p>Conclusion</p>
    </div>
`

            }
        ]
    }
};

const STORAGE_KEY = "emerald_connected_full_mock_v1";
const DASHBOARD_FULL_MOCK_KEY = "dashboardFullMockLaunch";
const REVIEW_ATTEMPT_ID = new URLSearchParams(window.location.search).get("review");
const AUTO_START_FULL_MOCK = new URLSearchParams(window.location.search).get("autostart");
const FULL_MOCK_WRITING_SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbzEad5_RWHsVdaybUw_1ckVjtBC0HfLMfEWsEVT0i-B5eS5hqgxG0JnLgROonDYW_ao/exec";
const FULL_MOCK_WRITING_SHEET_KEY = "";

const elements = {};
let state = loadState();
let timerId = null;
const FULL_MOCK_READING_ANSWER_KEY = {
    1: "viii", 2: "vi", 3: "ii", 4: "iv", 5: "vii", 6: "ix", 7: "iii",
    8: "false", 9: "true", 10: "not given",
    11: "front", 12: "endurance", 13: "digestive system",
    14: "H", 15: "D", 16: "I", 17: "A", 18: "F", 19: "E",
    20: "false", 21: "true", 22: "not given",
    23: "B", 24: "E", 25: "C", 26: "E",
    27: "E", 28: "A", 29: "G", 30: "C", 31: "B",
    32: "H", 33: "D", 34: "C", 35: "E", 36: "I", 37: "A", 38: "G", 39: "F", 40: "C"
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
    if (!isAuthenticated()) {
        window.location.href = FULL_MOCK_CONFIG.paths.authPage;
        return;
    }

    if (window.EmeraldFirebaseBridge) {
        await EmeraldFirebaseBridge.ready();
    }

    cacheElements();
    renderListeningStage();
    renderReadingStage();
    renderWritingStage();
    bindStaticEvents();
    restoreAllSavedInputs();
    prepareAudioPanel();
  renderAll();

if (REVIEW_ATTEMPT_ID) {
    const attempt = await loadFullMockReviewAttemptById(REVIEW_ATTEMPT_ID);
    if (!attempt) {
        alert("Full mock review attempt not found.");
        window.location.href = FULL_MOCK_CONFIG.paths.dashboardPage;
        return;
    }
    openFullMockReview(attempt);
    return;
}

if (consumeDashboardFullMockLaunch()) {
    return;
}

if (consumeQueryAutostartLaunch()) {
    return;
}

async function loadFullMockReviewAttemptById(attemptId) {
    const attempt = await EmeraldTracker.getAttemptById(attemptId);
    return attempt && attempt.kind === "fullMock" ? attempt : null;
}

function openFullMockReview(attempt) {
    resetState();
    state.started = true;
    state.finished = true;
    state.paused = true;
    state.candidateName = attempt.userName || getSignedInName() || "Candidate";
    state.answers = attempt.answers || state.answers;
    saveState();

    openExamView();
    hideExamIntroOverlay();
    hideOverlay(elements.lockdownOverlay);
    restoreAllSavedInputs();
    disableAllReviewInputs();
    renderAll();

    const message = [
        `Listening band: ${attempt.listeningBand ?? "-"}`,
        `Reading band: ${attempt.readingBand ?? "-"}`,
        `Writing band: ${attempt.writingBand ?? "-"}`,
        `Overall band: ${attempt.overallBand ?? "-"}`,
        "This review shows your saved full mock responses."
    ].join(" ");

    showSectionModal("Full mock review", message, "Finish Review", () => {
        window.location.href = FULL_MOCK_CONFIG.paths.dashboardPage;
    });
}

function disableAllReviewInputs() {
    document.querySelectorAll("input, textarea").forEach(el => {
        if (el.id === "sectionModalActionBtn" || el.id === "sectionModalCloseBtn") return;
        el.disabled = true;
    });
    document.querySelectorAll(".stage-action-btn, .nav-btn, .part-btn, .task-btn").forEach(btn => {
        btn.disabled = true;
    });
}

applyResumeModeIfNeeded();

}


function consumeDashboardFullMockLaunch() {
    let launchData = null;

    try {
        launchData = JSON.parse(localStorage.getItem(DASHBOARD_FULL_MOCK_KEY));
    } catch {
        launchData = null;
    }

    if (!launchData || launchData.skipAccess !== true) {
        return false;
    }

    localStorage.removeItem(DASHBOARD_FULL_MOCK_KEY);

    state = defaultState();
    state.started = false;
    state.paused = true;
    state.candidateName = launchData.candidateName || getSignedInName() || "Candidate";

    saveState();
    setSharedSessionKeys(state.candidateName);
    openExamView();
    showExamIntroOverlay();

    return true;
}

function consumeQueryAutostartLaunch() {
    if (AUTO_START_FULL_MOCK !== "1" && AUTO_START_FULL_MOCK !== "true") {
        return false;
    }

    if (state.started && !state.finished) {
        return false;
    }

    const candidateName = getSignedInName() || "Candidate";
    state = defaultState();
    state.started = false;
    state.paused = true;
    state.candidateName = candidateName;
    saveState();
    setSharedSessionKeys(candidateName);
    openExamView();
    showExamIntroOverlay();

    if (window.history && window.history.replaceState) {
        const cleaned = window.location.pathname + (REVIEW_ATTEMPT_ID ? `?review=${encodeURIComponent(REVIEW_ATTEMPT_ID)}` : "");
        window.history.replaceState({}, document.title, cleaned);
    }

    return true;
}





function cacheElements() {
    const ids = [
        "mockLobby",
        "openMockAccessBtn",
        "mockAccessModal",
        "candidateNameInput",
        "accessCodeInput",
        "policyAgreeCheckbox",
        "agreementTypingInput",
        "accessErrorText",
        "closeMockAccessBtn",
        "confirmMockAccessBtn",
        "mockExam",
        "candidateDisplay",
        "sectionTitleDisplay",
        "timerDisplay",
        "violationDisplay",
        "sectionProgress",
        "listeningStage",
        "readingStage",
        "writingStage",
        "listeningPartSwitcher",
        "listeningParts",
        "listeningNumberGrid",
        "audioStatusText",
        "mockAudio",
        "mockAudioSource",
        "finishListeningBtn",
        "readingPassagePane",
        "readingQuestionsPane",
        "readingPrevBtn",
        "readingNextBtn",
        "readingNumberGrid",
        "finishReadingBtn",
        "writingTaskKicker",
        "writingTaskHeading",
        "writingTaskSubheading",
        "writingPromptCard",
        "writingAnswerLabel",
        "writingTargetHint",
        "writingAnswerInput",
        "taskOneWordCount",
        "taskTwoWordCount",
        "currentTaskWordCount",
        "writingTaskSwitcher",
        "submitWritingBtn",
        "examIntroOverlay",
"startExamFromIntroBtn",

        "lockdownOverlay",
        "lockdownMessage",
        "resumeExamBtn",
        "sectionModal",
        "sectionModalTitle",
        "sectionModalMessage",
        "sectionModalCloseBtn",
        "sectionModalActionBtn"
    ];

    ids.forEach((id) => {
        elements[id] = document.getElementById(id);
    });
}

function defaultState() {
    return {
        started: false,
        finished: false,
        paused: false,
        candidateName: "",
        sectionIndex: 0,
        sectionTimeLeft: FULL_MOCK_CONFIG.sections.reduce((acc, section) => {
            acc[section.id] = section.durationSeconds;
            return acc;
        }, {}),
        violationCount: 0,
        lastViolationAt: 0,
        listeningPart: 1,
        readingPassage: 1,
        writingTaskIndex: 0,
        answers: {
            listening: {},
            reading: {},
            writing: {
                task1: "",
                task2: ""
            }
        }
    };
}

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const defaults = defaultState();
        return {
            ...defaults,
            ...saved,
            sectionTimeLeft: {
                ...defaults.sectionTimeLeft,
                ...(saved && saved.sectionTimeLeft ? saved.sectionTimeLeft : {})
            },
            answers: {
                listening: {
                    ...defaults.answers.listening,
                    ...(saved && saved.answers && saved.answers.listening ? saved.answers.listening : {})
                },
                reading: {
                    ...defaults.answers.reading,
                    ...(saved && saved.answers && saved.answers.reading ? saved.answers.reading : {})
                },
                writing: {
                    ...defaults.answers.writing,
                    ...(saved && saved.answers && saved.answers.writing ? saved.answers.writing : {})
                }
            }
        };
    } catch {
        return defaultState();
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
    state = defaultState();
    saveState();
}

function isAuthenticated() {
    if (localStorage.getItem("userToken")) {
        return true;
    }

    const legacyUser = localStorage.getItem("user");
    if (!legacyUser) {
        return false;
    }

    try {
        const parsed = JSON.parse(legacyUser);
        return Boolean(parsed);
    } catch {
        return false;
    }
}

function getSignedInName() {
    const currentName = localStorage.getItem("userName");
    if (currentName) {
        return currentName;
    }

    const legacyUser = localStorage.getItem("user");
    if (!legacyUser) {
        return "";
    }

    try {
        const parsed = JSON.parse(legacyUser);
        return parsed && parsed.name ? parsed.name : "";
    } catch {
        return "";
    }
}

function currentSection() {
    return FULL_MOCK_CONFIG.sections[state.sectionIndex];
}

function currentSectionId() {
    return currentSection().id;
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function countWords(text) {
    const matches = String(text || "").trim().match(/\S+/g);
    return matches ? matches.length : 0;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function listeningInput(id, className = "") {
    return `<input type="text" id="${id}" data-section="listening" class="exam-input ${className}">`;
}

function readingInput(id) {
    return `<input type="text" id="${id}" data-section="reading" class="exam-input">`;
}

function renderListeningStage() {
    elements.listeningPartSwitcher.innerHTML = [1, 2, 3, 4]
        .map((partNumber) => {
            return `<button class="part-btn" type="button" data-listening-part="${partNumber}">Part ${partNumber}</button>`;
        })
        .join("");

    elements.listeningParts.innerHTML = `
        <article class="listening-part" data-part="1">
            <div class="section-heading-row">
                <span>SECTION 1</span>
                <strong>Questions 1-10</strong>
            </div>

            <p class="prompt-copy">
                Questions 1-6. Complete the notes below. Write <strong>ONE WORD</strong> for each answer.
            </p>

            <section class="question-paper">
                <h3 class="paper-title">SELF-DRIVE TOURS IN THE USA</h3>

                <div class="q-row">Example</div>
                <div class="q-row"><strong>Name:</strong> Andrea Brown</div>
                <div class="q-row"><strong>Address:</strong> 24 ${listeningInput("lq1")} Road</div>
                <div class="q-row"><strong>Postcode:</strong> BH5 2OP</div>
                <div class="q-row"><strong>Phone:</strong> (mobile) 077 8664 3091</div>
                <div class="q-row"><strong>Heard about company from:</strong> ${listeningInput("lq2")}</div>

                <div class="question-block">
                    <strong>Possible self-drive tours</strong>
                </div>

                <div class="question-block">
                    <strong>Trip One:</strong>
                    <ul class="exam-list">
                        <li>Los Angeles: customer wants to visit some ${listeningInput("lq3")} parks with her children</li>
                        <li>Yosemite Park: customer wants to stay in a lodge, not a ${listeningInput("lq4")}</li>
                    </ul>
                </div>

                <div class="question-block">
                    <strong>Trip Two:</strong>
                    <ul class="exam-list">
                        <li>Customer wants to see the ${listeningInput("lq5")} on the way to Cambria</li>
                        <li>At Santa Monica: not interested in shopping</li>
                        <li>At San Diego, wants to spend time on the ${listeningInput("lq6")}</li>
                    </ul>
                </div>
            </section>

            <div class="instruction-card">
                <h4>Questions 7-10</h4>
                <p>
                    Complete the table below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.
                </p>
            </div>

            <section class="question-paper">
                <div class="q-row"><strong>Trip One</strong> 12 days | Total distance: ${listeningInput("lq7")} km | Price: GBP 525</div>
                <div class="q-row">Includes: accommodation, car, one ${listeningInput("lq8")}</div>
                <div class="q-row"><strong>Trip Two</strong> 9 days | Total distance: 980 km | Price: GBP ${listeningInput("lq9")}</div>
                <div class="q-row">Includes: accommodation, car, ${listeningInput("lq10")}</div>
            </section>
        </article>

        <article class="listening-part" data-part="2">
            <div class="section-heading-row">
                <span>SECTION 2</span>
                <strong>Questions 11-20</strong>
            </div>

            <div class="instruction-card">
                <h4>Questions 11-12</h4>
                <p>Choose <strong>TWO</strong> letters <strong>A-E</strong>.</p>
                <p>Which <strong>TWO</strong> facilities at the leisure club have recently been improved?</p>
            </div>

            <section class="question-paper">
                <div class="options-grid">
                    <label class="multi-label">
                        <input type="checkbox" name="lq11_12" value="A" data-section="listening">
                        <span><strong>A</strong> the gym</span>
                    </label>
                    <label class="multi-label">
                        <input type="checkbox" name="lq11_12" value="B" data-section="listening">
                        <span><strong>B</strong> the tracks</span>
                    </label>
                    <label class="multi-label">
                        <input type="checkbox" name="lq11_12" value="C" data-section="listening">
                        <span><strong>C</strong> the indoor pool</span>
                    </label>
                    <label class="multi-label">
                        <input type="checkbox" name="lq11_12" value="D" data-section="listening">
                        <span><strong>D</strong> the outdoor pool</span>
                    </label>
                    <label class="multi-label">
                        <input type="checkbox" name="lq11_12" value="E" data-section="listening">
                        <span><strong>E</strong> the sports training for children</span>
                    </label>
                </div>
            </section>

            <div class="instruction-card">
                <h4>Questions 13-20</h4>
                <p>
                    Complete the notes below. Write <strong>NO MORE THAN TWO WORDS</strong> for each answer.
                </p>
            </div>

            <section class="question-paper">
                <h3 class="paper-title">Joining the leisure club</h3>

                <div class="question-block">
                    <strong>Personal Assessment</strong>
                    <ul class="exam-list">
                        <li>New members should describe any ${listeningInput("lq13")}</li>
                        <li>The ${listeningInput("lq14")} will be explained to you before you use the equipment.</li>
                        <li>You will be given a six-week ${listeningInput("lq15")}</li>
                    </ul>
                </div>

                <div class="question-block">
                    <strong>Types of membership</strong>
                    <ul class="exam-list">
                        <li>There is a compulsory GBP 90 ${listeningInput("lq16")} fee for members.</li>
                        <li>Gold members are given ${listeningInput("lq17")} to all the LP clubs.</li>
                        <li>Premier members are given priority during ${listeningInput("lq18")} hours.</li>
                        <li>Premier members can bring some ${listeningInput("lq19")} every month.</li>
                        <li>Members should always take their ${listeningInput("lq20")} with them.</li>
                    </ul>
                </div>
            </section>
        </article>

        <article class="listening-part" data-part="3">
            <div class="section-heading-row">
                <span>SECTION 3</span>
                <strong>Questions 21-30</strong>
            </div>

            <div class="instruction-card">
                <h4>Questions 21-25</h4>
                <p>Choose the correct letter, <strong>A, B or C</strong>.</p>
            </div>

            <section class="question-paper">
                <h3 class="paper-title">Global Design Competition</h3>

                ${renderListeningRadioQuestion(
                    "lq21",
                    21,
                    "Students entering the design competition have to",
                    [
                        "produce an energy-efficient design.",
                        "adapt an existing energy-saving appliance.",
                        "develop a new use for current technology."
                    ]
                )}

                ${renderListeningRadioQuestion(
                    "lq22",
                    22,
                    "John chose a dishwasher because he wanted to make dishwashers",
                    [
                        "more appealing.",
                        "more common.",
                        "more economical."
                    ]
                )}

                ${renderListeningRadioQuestion(
                    "lq23",
                    23,
                    "The stone in John's 'Rockpool' design is used",
                    [
                        "for decoration.",
                        "to switch it on.",
                        "to stop water escaping."
                    ]
                )}

                ${renderListeningRadioQuestion(
                    "lq24",
                    24,
                    "In the holding chamber, the carbon dioxide",
                    [
                        "changes back to a gas.",
                        "dries the dishes.",
                        "is allowed to cool."
                    ]
                )}

                ${renderListeningRadioQuestion(
                    "lq25",
                    25,
                    "At the end of the cleaning process, the carbon dioxide",
                    [
                        "is released into the air.",
                        "is disposed of with the waste.",
                        "is collected ready to be re-used."
                    ]
                )}
            </section>

            <div class="instruction-card">
                <h4>Questions 26-30</h4>
                <p>Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</p>
            </div>

            <section class="question-paper">
                <div class="q-row"><span class="number-tag">26</span> John needs help preparing for his ${listeningInput("lq26")}</div>
                <div class="q-row"><span class="number-tag">27</span> The professor advises John to make a ${listeningInput("lq27")} of his design.</div>
                <div class="q-row"><span class="number-tag">28</span> John's main problem is getting good quality ${listeningInput("lq28")}</div>
                <div class="q-row"><span class="number-tag">29</span> The professor suggests John apply for a ${listeningInput("lq29")}</div>
                <div class="q-row"><span class="number-tag">30</span> The professor will check the ${listeningInput("lq30")} information in John's written report.</div>
            </section>
        </article>

        <article class="listening-part" data-part="4">
            <div class="section-heading-row">
                <span>SECTION 4</span>
                <strong>Questions 31-40</strong>
            </div>

            <div class="instruction-card">
                <h4>Questions 31-40</h4>
                <p>Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</p>
            </div>

            <section class="question-paper">
                <h3 class="paper-title">THE SPIRIT BEAR</h3>

                <div class="question-block">
                    <strong>General facts</strong>
                    <ul class="exam-list">
                        <li>It is a white bear belonging to the black bear family.</li>
                        <li>Its colour comes from an uncommon ${listeningInput("lq31")}</li>
                        <li>Local people believe that it has unusual ${listeningInput("lq32")}</li>
                        <li>They protect the bear from ${listeningInput("lq33")}</li>
                    </ul>
                </div>

                <div class="question-block">
                    <strong>Habitat</strong>
                    <ul class="exam-list">
                        <li>The bear's relationship with the forest is complex.</li>
                        <li>Tree roots stop ${listeningInput("lq34")} along salmon streams.</li>
                        <li>The bears' feeding habits provide nutrients for forest vegetation.</li>
                        <li>It is currently found on a small number of ${listeningInput("lq35")}</li>
                    </ul>
                </div>

                <div class="question-block">
                    <strong>Threats</strong>
                    <ul class="exam-list">
                        <li>Habitat is being lost due to deforestation and construction of ${listeningInput("lq36")} by logging companies.</li>
                        <li>Unrestricted ${listeningInput("lq37")} is affecting the salmon supply.</li>
                        <li>The bears' existence is also threatened by their low rate of ${listeningInput("lq38")}</li>
                    </ul>
                </div>

                <div class="question-block">
                    <strong>Going forward</strong>
                    <ul class="exam-list">
                        <li>Interested parties are working together.</li>
                        <li>Logging companies must improve their ${listeningInput("lq39")} of logging.</li>
                        <li>Maintenance and ${listeningInput("lq40")} of the spirit bears' territory is needed.</li>
                    </ul>
                </div>
            </section>
        </article>
    `;

    bindListeningEvents();
    buildListeningNumberGrid();
}

function renderListeningRadioQuestion(groupName, number, questionText, options) {
    return `
        <div class="question-block">
            <p class="prompt-copy"><span class="number-tag">${number}</span> ${questionText}</p>
            ${options
                .map((option, index) => {
                    const letter = String.fromCharCode(65 + index);
                    return `
                        <label class="mcq-label">
                            <input type="radio" name="${groupName}" value="${letter}" data-section="listening">
                            <span><strong>${letter}</strong> ${option}</span>
                        </label>
                    `;
                })
                .join("")}
        </div>
    `;
}

function renderReadingStage() {
    elements.readingPassagePane.innerHTML = FULL_MOCK_CONFIG.reading.passages
        .map((passage, index) => {
            const passageNumber = index + 1;
            return `
                <article class="reading-passage" data-reading-passage="${passageNumber}">
                    <h3>${escapeHtml(passage.title)}</h3>
                    ${passage.bodyHtml}
                </article>
            `;
        })
        .join("");

    elements.readingQuestionsPane.innerHTML = FULL_MOCK_CONFIG.reading.groups
        .map((group, index) => {
            const passageNumber = index + 1;
            const questionHtml = group.bodyHtml || Array.from({ length: group.end - group.start + 1 }, (_, offset) => {
                const questionNumber = group.start + offset;
                return `
                    <div class="reading-question-card">
                        <p class="reading-question-text">
                            <span class="number-tag">${questionNumber}</span>
                            Reading question ${questionNumber} placeholder
                        </p>
                        ${readingInput(`rq${questionNumber}`)}
                    </div>
                `;
            }).join("");
            return `
                <article class="reading-question-group" data-reading-group="${passageNumber}">
                    <h3>${escapeHtml(group.title)}</h3>
                    <p class="reading-guide">${escapeHtml(group.guide)}</p>
                    ${questionHtml}
                </article>
            `;
        })
        .join("");

    bindReadingEvents();
    buildReadingNumberGrid();
}

function renderWritingStage() {
    elements.writingTaskSwitcher.innerHTML = FULL_MOCK_CONFIG.writing.tasks
        .map((task, index) => {
            return `<button class="task-btn" type="button" data-writing-task="${index}">${escapeHtml(task.label)}</button>`;
        })
        .join("");

    bindWritingEvents();
}

function bindStaticEvents() {
    elements.openMockAccessBtn.addEventListener("click", openAccessModal);
    elements.closeMockAccessBtn.addEventListener("click", closeAccessModal);
    elements.confirmMockAccessBtn.addEventListener("click", beginFullMock);
    elements.finishListeningBtn.addEventListener("click", () => completeCurrentSection(false));
    elements.finishReadingBtn.addEventListener("click", () => completeCurrentSection(false));
    elements.submitWritingBtn.addEventListener("click", () => completeCurrentSection(false));
    elements.readingPrevBtn.addEventListener("click", () => showReadingPassage(state.readingPassage - 1));
    elements.readingNextBtn.addEventListener("click", () => showReadingPassage(state.readingPassage + 1));
    elements.resumeExamBtn.addEventListener("click", resumeExamFromOverlay);
    elements.startExamFromIntroBtn.addEventListener("click", startExamFromIntroOverlay);


    elements.mockAccessModal.addEventListener("click", (event) => {
        if (event.target === elements.mockAccessModal) {
            closeAccessModal();
        }
    });

    elements.agreementTypingInput.dataset.keyboardUsed = "false";
    elements.agreementTypingInput.addEventListener("keydown", () => {
        elements.agreementTypingInput.dataset.keyboardUsed = "true";
    });
    elements.agreementTypingInput.addEventListener("paste", (event) => event.preventDefault());
    elements.agreementTypingInput.addEventListener("drop", (event) => event.preventDefault());

    setupSecurityGuards();
}

function bindListeningEvents() {
    document.querySelectorAll("[data-listening-part]").forEach((button) => {
        button.addEventListener("click", () => {
            showListeningPart(Number(button.dataset.listeningPart));
        });
    });

    document.querySelectorAll('[data-section="listening"]').forEach((input) => {
        const eventName = input.type === "radio" || input.type === "checkbox" ? "change" : "input";
        input.addEventListener(eventName, () => {
            if (input.type === "checkbox" && input.name === "lq11_12") {
                enforceCheckboxLimit("lq11_12", 2);
            }
            persistInputValue("listening", input);
            updateListeningGrid();
        });
    });
}

function bindReadingEvents() {
    document.querySelectorAll('[data-section="reading"]').forEach((input) => {
        input.addEventListener("input", () => {
            persistInputValue("reading", input);
            updateReadingGrid();
        });
    });
}

function bindWritingEvents() {
    document.querySelectorAll("[data-writing-task]").forEach((button) => {
        button.addEventListener("click", () => {
            switchWritingTask(Number(button.dataset.writingTask));
        });
    });

    elements.writingAnswerInput.addEventListener("input", () => {
        const taskKey = getCurrentWritingTaskKey();
        state.answers.writing[taskKey] = elements.writingAnswerInput.value;
        saveState();
        renderWritingMetrics();
    });
}

function prepareAudioPanel() {
    if (FULL_MOCK_CONFIG.audioSrc) {
        elements.mockAudioSource.src = FULL_MOCK_CONFIG.audioSrc;
        elements.mockAudioSource.type = FULL_MOCK_CONFIG.audioType;
        elements.mockAudio.load();
        elements.audioStatusText.textContent = "Listening audio is connected. Press play when the section starts.";
        return;
    }

    elements.audioStatusText.textContent = "No audio file is connected yet. Update FULL_MOCK_CONFIG.audioSrc in full-mock.js.";
    elements.mockAudio.removeAttribute("controls");
    elements.mockAudio.classList.add("hidden");
}

function buildListeningNumberGrid() {
    elements.listeningNumberGrid.innerHTML = "";

    for (let question = 1; question <= 40; question += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "number-dot";
        button.textContent = question;
        button.dataset.question = String(question);
        button.addEventListener("click", () => {
            showListeningPart(getListeningPartForQuestion(question));
        });
        elements.listeningNumberGrid.appendChild(button);
    }
}

function buildReadingNumberGrid() {
    elements.readingNumberGrid.innerHTML = "";

    for (let question = 1; question <= 40; question += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "number-dot";
        button.textContent = question;
        button.dataset.question = String(question);
        button.addEventListener("click", () => {
            showReadingPassage(getReadingPassageForQuestion(question));
        });
        elements.readingNumberGrid.appendChild(button);
    }
}

function persistInputValue(sectionName, input) {
    if (!state.answers[sectionName]) {
        state.answers[sectionName] = {};
    }

    if (input.type === "radio") {
        if (input.checked) {
            state.answers[sectionName][input.name] = input.value;
        }
    } else if (input.type === "checkbox") {
        state.answers[sectionName][input.name] = Array.from(document.querySelectorAll(`input[name="${input.name}"]:checked`)).map((node) => node.value);
    } else {
        state.answers[sectionName][input.id] = input.value;
    }

    saveState();
}

function restoreAllSavedInputs() {
    restoreSectionInputs("listening");
    restoreSectionInputs("reading");
    renderWritingTask();
    renderWritingMetrics();
    updateListeningGrid();
    updateReadingGrid();
}

function restoreSectionInputs(sectionName) {
    const answers = state.answers[sectionName] || {};

    document.querySelectorAll(`[data-section="${sectionName}"]`).forEach((input) => {
        if (input.type === "radio") {
            input.checked = answers[input.name] === input.value;
        } else if (input.type === "checkbox") {
            const selectedValues = answers[input.name] || [];
            input.checked = Array.isArray(selectedValues) && selectedValues.includes(input.value);
        } else if (typeof answers[input.id] === "string") {
            input.value = answers[input.id];
        }
    });
}

function showListeningPart(partNumber) {
    const safePart = Math.min(Math.max(partNumber, 1), 4);
    state.listeningPart = safePart;
    saveState();

    document.querySelectorAll(".listening-part").forEach((part) => {
        part.classList.toggle("active", Number(part.dataset.part) === safePart);
    });

    document.querySelectorAll("[data-listening-part]").forEach((button) => {
        button.classList.toggle("active", Number(button.dataset.listeningPart) === safePart);
    });

    updateListeningGrid();
}

function showReadingPassage(passageNumber) {
    const safePassage = Math.min(Math.max(passageNumber, 1), 3);
    state.readingPassage = safePassage;
    saveState();

    document.querySelectorAll("[data-reading-passage]").forEach((node) => {
        node.classList.toggle("active", Number(node.dataset.readingPassage) === safePassage);
    });

    document.querySelectorAll("[data-reading-group]").forEach((node) => {
        node.classList.toggle("active", Number(node.dataset.readingGroup) === safePassage);
    });

    elements.readingPrevBtn.disabled = safePassage === 1;
    elements.readingNextBtn.disabled = safePassage === 3;

    updateReadingGrid();
}

function switchWritingTask(taskIndex) {
    const safeIndex = Math.min(Math.max(taskIndex, 0), FULL_MOCK_CONFIG.writing.tasks.length - 1);
    state.writingTaskIndex = safeIndex;
    saveState();
    renderWritingTask();
    renderWritingMetrics();
}

function renderWritingTask() {
    const task = FULL_MOCK_CONFIG.writing.tasks[state.writingTaskIndex];
    const taskKey = getCurrentWritingTaskKey();

    elements.writingTaskKicker.textContent = task.label;
    elements.writingTaskHeading.textContent = task.heading;
    elements.writingTaskSubheading.textContent = task.subheading;
    elements.writingPromptCard.innerHTML = task.promptHtml;
    elements.writingAnswerLabel.textContent = `${task.label} Answer`;
    elements.writingTargetHint.textContent = `Write at least ${task.minWords} words.`;
    elements.writingAnswerInput.value = state.answers.writing[taskKey] || "";

    document.querySelectorAll("[data-writing-task]").forEach((button) => {
        button.classList.toggle("active", Number(button.dataset.writingTask) === state.writingTaskIndex);
    });
}

function renderWritingMetrics() {
    const taskOneWords = countWords(state.answers.writing.task1);
    const taskTwoWords = countWords(state.answers.writing.task2);
    const currentWords = countWords(elements.writingAnswerInput.value);

    elements.taskOneWordCount.textContent = String(taskOneWords);
    elements.taskTwoWordCount.textContent = String(taskTwoWords);
    elements.currentTaskWordCount.textContent = String(currentWords);
}

function getCurrentWritingTaskKey() {
    return state.writingTaskIndex === 0 ? "task1" : "task2";
}

function renderAll() {
    renderCandidate();
    renderSectionProgress();
    renderExamShell();
    renderTimer();
    renderViolationCounter();
}

function renderCandidate() {
    const fallbackName = state.candidateName || getSignedInName() || "Candidate";
    elements.candidateDisplay.textContent = fallbackName;
    elements.candidateNameInput.value = state.candidateName || getSignedInName() || "";
}

function renderSectionProgress() {
    elements.sectionProgress.innerHTML = FULL_MOCK_CONFIG.sections
        .map((section, index) => {
            let className = "section-pill locked";
            if (index < state.sectionIndex) {
                className = "section-pill completed";
            } else if (index === state.sectionIndex) {
                className = "section-pill active";
            }
            return `<div class="${className}">${escapeHtml(section.label)}</div>`;
        })
        .join("");
}

function renderExamShell() {
    const activeSectionId = currentSectionId();

    elements.sectionTitleDisplay.textContent = currentSection().label;
    elements.listeningStage.classList.toggle("active", activeSectionId === "listening");
    elements.readingStage.classList.toggle("active", activeSectionId === "reading");
    elements.writingStage.classList.toggle("active", activeSectionId === "writing");

    if (activeSectionId === "listening") {
        showListeningPart(state.listeningPart || 1);
    }

    if (activeSectionId === "reading") {
        showReadingPassage(state.readingPassage || 1);
    }

    if (activeSectionId === "writing") {
        renderWritingTask();
        renderWritingMetrics();
    }
}

function renderTimer() {
    const remaining = state.sectionTimeLeft[currentSectionId()];
    elements.timerDisplay.textContent = formatTime(remaining);
}

function renderViolationCounter() {
    elements.violationDisplay.textContent = `${state.violationCount} / ${FULL_MOCK_CONFIG.maxViolations}`;
}

function openAccessModal() {
    elements.accessErrorText.textContent = "";
    elements.accessCodeInput.value = "";
    elements.agreementTypingInput.value = "";
    elements.agreementTypingInput.dataset.keyboardUsed = "false";
    elements.policyAgreeCheckbox.checked = false;
    elements.mockAccessModal.classList.remove("hidden");
    elements.candidateNameInput.focus();
}

function closeAccessModal() {
    elements.mockAccessModal.classList.add("hidden");
    elements.accessErrorText.textContent = "";
}


function showExamIntroOverlay() {
    showOverlay(elements.examIntroOverlay);
}

function hideExamIntroOverlay() {
    hideOverlay(elements.examIntroOverlay);
}

async function startExamFromIntroOverlay() {
    await requestExamFullscreen();

    if (!document.fullscreenElement) {
        return;
    }

    state.started = true;
    state.paused = false;
    saveState();

    hideExamIntroOverlay();
    renderAll();
    startTimer();

    if (currentSectionId() === "listening") {
        tryPlayListeningAudio();
    }
}



async function beginFullMock() {
    const candidateName = elements.candidateNameInput.value.trim();
    const accessCode = elements.accessCodeInput.value.trim();
    const typedAgreement = elements.agreementTypingInput.value.trim();

    elements.accessErrorText.textContent = "";

    if (!candidateName) {
        elements.accessErrorText.textContent = "Please enter the candidate name.";
        return;
    }

    if (accessCode !== FULL_MOCK_CONFIG.accessCode) {
        elements.accessErrorText.textContent = "Incorrect access code.";
        return;
    }

    if (!elements.policyAgreeCheckbox.checked) {
        elements.accessErrorText.textContent = "You must agree to the policy before starting.";
        return;
    }

    if (typedAgreement !== FULL_MOCK_CONFIG.agreementText) {
        elements.accessErrorText.textContent = "Please type the agreement sentence exactly.";
        return;
    }

    if (elements.agreementTypingInput.dataset.keyboardUsed !== "true") {
        elements.accessErrorText.textContent = "Please type the agreement manually using the keyboard.";
        return;
    }

    state = defaultState();
state.started = false;
state.paused = true;
state.candidateName = candidateName;
saveState();
setSharedSessionKeys(candidateName);
closeAccessModal();
openExamView();
showExamIntroOverlay();

}

function openLobbyView() {
    elements.mockExam.classList.add("hidden");
    elements.mockLobby.classList.remove("hidden");
    hideExamIntroOverlay();
    hideOverlay(elements.lockdownOverlay);
    hideOverlay(elements.sectionModal);
}

function openExamView() {
    elements.mockLobby.classList.add("hidden");
    elements.mockExam.classList.remove("hidden");
    renderAll();
}

function closeExamView() {
    stopTimer();
    pauseListeningAudio();
    openLobbyView();
}

function consumeDashboardLaunch() {
    if (state.started && !state.finished) return false;

    let launch = null;
    try {
        launch = JSON.parse(localStorage.getItem("dashboardFullMockLaunch"));
    } catch {
        launch = null;
    }

    if (!launch || !launch.verified) return false;

    localStorage.removeItem("dashboardFullMockLaunch");

    state = defaultState();
    state.started = true;
    state.candidateName = launch.candidateName || getSignedInName() || "Candidate";
    saveState();
    setSharedSessionKeys(state.candidateName);
    openExamView();
    requestExamFullscreen().catch(() => {});
    startTimer();
    tryPlayListeningAudio();

    return true;
}



function applyResumeModeIfNeeded() {
    if (!state.started || state.finished) {
        openLobbyView();
        renderCandidate();
        return;
    }

    openExamView();
    startTimer();
    requestExamFullscreen().catch(() => {});
    if (currentSectionId() === "listening") {
        tryPlayListeningAudio();
    }
}

function startTimer() {
    stopTimer();
    renderTimer();

    timerId = setInterval(() => {
        if (!state.started || state.finished || state.paused) {
            return;
        }

        const sectionId = currentSectionId();
        state.sectionTimeLeft[sectionId] = Math.max(0, state.sectionTimeLeft[sectionId] - 1);
        saveState();
        renderTimer();

        if (state.sectionTimeLeft[sectionId] === 0) {
            completeCurrentSection(true);
        }
    }, 1000);
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function completeCurrentSection(fromTimer) {
    if (!state.started || state.finished) {
        return;
    }

    if (currentSectionId() === "writing") {
        finishWholeMock(fromTimer);
        return;
    }

    state.paused = true;
    saveState();
    stopTimer();
    pauseListeningAudio();

    const sectionId = currentSectionId();
    const nextSection = FULL_MOCK_CONFIG.sections[state.sectionIndex + 1];
    const answeredCount = sectionId === "listening" ? countAnsweredListeningQuestions() : countAnsweredReadingQuestions();

    function closeSectionModalAndResume() {
    hideOverlay(elements.sectionModal);
    state.finished = false;
    state.paused = false;
    saveState();
    renderAll();
    requestExamFullscreen().catch(() => {});
    startTimer();

    if (currentSectionId() === "listening") {
        tryPlayListeningAudio();
    }
}


showSectionModal(
    `${currentSection().label} complete`,
    fromTimer
        ? `Time is up for ${currentSection().label}. Answered: ${answeredCount}/40. Continue to ${nextSection.label}.`
        : `You finished ${currentSection().label}. Answered: ${answeredCount}/40. Continue to ${nextSection.label}.`,
    `Continue to ${nextSection.label}`,
    () => {
        hideOverlay(elements.sectionModal);
        state.sectionIndex += 1;
        state.paused = false;
        state.lastViolationAt = 0;
        saveState();
        updateSharedStageKey();
        renderAll();
        requestExamFullscreen().catch(() => {});
        startTimer();
    },
    !fromTimer,
    closeSectionModalAndResume
);

    
}

async function finishWholeMock(fromTimer) {
    state.paused = true;
    state.finished = true;
    saveState();
    stopTimer();
    pauseListeningAudio();

    if (!window.EmeraldWritingAI) {
        showSectionModal("Full mock completed", "Writing AI scorer is not available.", "Return to Dashboard", () => {
            clearSharedSessionKeys();
            resetState();
            restoreAllSavedInputs();
            window.location.href = FULL_MOCK_CONFIG.paths.dashboardPage;
        });
        return;
    }

    const listeningAnswered = countAnsweredListeningQuestions();
    const readingCorrect = countCorrectReadingQuestions();
    const writingResult = await EmeraldWritingAI.evaluateWritingAsync(
        state.answers.writing.task1 || "",
        state.answers.writing.task2 || ""
    );

    const listeningBand = EmeraldTracker.convertListeningScoreToBand(listeningAnswered);
    const readingBand = EmeraldTracker.convertReadingScoreToBand(readingCorrect);
    const writingBand = writingResult.overallBand;
    const overallBand = EmeraldTracker.calculateOverallBand({
        listening: listeningBand,
        reading: readingBand,
        writing: writingBand,
        speaking: null
    });

    const persistenceTasks = [
        EmeraldTracker.recordSectionResult({
            section: "listening",
            testId: "full-mock-test1",
            correctAnswers: listeningAnswered,
            totalQuestions: 40,
            band: listeningBand,
            mode: "full_mock"
        }),
        EmeraldTracker.recordSectionResult({
            section: "reading",
            testId: "full-mock-test1",
            correctAnswers: readingCorrect,
            totalQuestions: 40,
            band: readingBand,
            mode: "full_mock"
        }),
        EmeraldTracker.recordSectionResult({
            section: "writing",
            testId: "full-mock-test1",
            band: writingBand,
            mode: "full_mock",
            meta: {
                task1Band: writingResult.task1Band,
                task2Band: writingResult.task2Band,
                task1Words: writingResult.task1Words,
                task2Words: writingResult.task2Words
            }
        }),
        EmeraldTracker.recordFullMockResult({
            testId: "test1",
            listeningBand,
            readingBand,
            writingBand,
            overallBand,
            answers: state.answers,
            meta: {
                task1Band: writingResult.task1Band,
                task2Band: writingResult.task2Band
            }
        }),
        saveFullMockWritingToSheet({
            candidateName: state.candidateName || "",
            testId: "full-mock-test1",
            task1: state.answers.writing.task1 || "",
            task2: state.answers.writing.task2 || "",
            task1Words: writingResult.task1Words || 0,
            task2Words: writingResult.task2Words || 0,
            writingBand,
            overallBand
        })
    ];

    const message = [
        fromTimer ? "The writing timer has ended." : "The full mock has been submitted.",
        `Listening band: ${listeningBand}`,
        `Reading band: ${readingBand} (${readingCorrect}/40 correct)`,
        `Writing Task 1 band: ${writingResult.task1Band}`,
        `Writing Task 2 band: ${writingResult.task2Band}`,
        `Writing overall band: ${writingBand}`,
        `Full mock overall: ${overallBand}`
    ].join(" ");

showSectionModal("Full mock completed", message, "Return to Dashboard", () => {
    clearSharedSessionKeys();
    resetState();
    restoreAllSavedInputs();
    window.location.href = FULL_MOCK_CONFIG.paths.dashboardPage;
});

    Promise.allSettled(persistenceTasks).then((results) => {
        const failed = results.filter((result) => result.status === "rejected");
        if (failed.length) {
            console.error("Some full mock save operations failed:", failed);
        }
    });

}

function showSectionModal(title, message, buttonLabel, action, allowClose = false, closeAction = null) {
    elements.sectionModalTitle.textContent = title;
    elements.sectionModalMessage.textContent = message;
    elements.sectionModalActionBtn.textContent = buttonLabel;
    elements.sectionModalActionBtn.onclick = action;

    elements.sectionModalCloseBtn.classList.toggle("hidden", !allowClose);
    elements.sectionModalCloseBtn.onclick = allowClose && closeAction ? closeAction : null;

    showOverlay(elements.sectionModal);
}


function showOverlay(overlay) {
    overlay.classList.remove("hidden");
}

function hideOverlay(overlay) {
    overlay.classList.add("hidden");
}

function countAnsweredListeningQuestions() {
    let answered = 0;

    for (let question = 1; question <= 40; question += 1) {
        if (isListeningQuestionAnswered(question)) {
            answered += 1;
        }
    }

    return answered;
}

function countAnsweredReadingQuestions() {
    let answered = 0;

    for (let question = 1; question <= 40; question += 1) {
        const input = document.getElementById(`rq${question}`);
        if (input && input.value.trim() !== "") {
            answered += 1;
        }
    }

    return answered;
}

function isListeningQuestionAnswered(questionNumber) {
    if (questionNumber >= 1 && questionNumber <= 10) {
        const input = document.getElementById(`lq${questionNumber}`);
        return Boolean(input && input.value.trim());
    }

    if (questionNumber === 11) {
        return getCheckedValues("lq11_12").length >= 1;
    }

    if (questionNumber === 12) {
        return getCheckedValues("lq11_12").length >= 2;
    }

    if (questionNumber >= 13 && questionNumber <= 20) {
        const input = document.getElementById(`lq${questionNumber}`);
        return Boolean(input && input.value.trim());
    }

    if (questionNumber >= 21 && questionNumber <= 25) {
        return Boolean(document.querySelector(`input[name="lq${questionNumber}"]:checked`));
    }

    const input = document.getElementById(`lq${questionNumber}`);
    return Boolean(input && input.value.trim());
}

function updateListeningGrid() {
    elements.listeningNumberGrid.querySelectorAll(".number-dot").forEach((dot) => {
        const questionNumber = Number(dot.dataset.question);
        dot.classList.toggle("answered", isListeningQuestionAnswered(questionNumber));
        dot.classList.toggle("current-scope", getListeningPartForQuestion(questionNumber) === state.listeningPart);
    });
}

function updateReadingGrid() {
    elements.readingNumberGrid.querySelectorAll(".number-dot").forEach((dot) => {
        const questionNumber = Number(dot.dataset.question);
        const input = document.getElementById(`rq${questionNumber}`);
        dot.classList.toggle("answered", Boolean(input && input.value.trim()));
        dot.classList.toggle("current-scope", getReadingPassageForQuestion(questionNumber) === state.readingPassage);
    });
}

function getListeningPartForQuestion(questionNumber) {
    if (questionNumber <= 10) return 1;
    if (questionNumber <= 20) return 2;
    if (questionNumber <= 30) return 3;
    return 4;
}

function getReadingPassageForQuestion(questionNumber) {
    if (questionNumber <= 13) return 1;
    if (questionNumber <= 26) return 2;
    return 3;
}

function getCheckedValues(groupName) {
    return Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`)).map((node) => node.value);
}

function normalizeReadingText(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[.,;:!?()[\]{}'"`]/g, " ")
        .replace(/\s+/g, " ");
}

function normalizeTrueFalseNotGiven(value) {
    const normalized = normalizeReadingText(value).replace(/\s+/g, "");
    if (normalized === "t" || normalized === "true") return "true";
    if (normalized === "f" || normalized === "false") return "false";
    if (normalized === "ng" || normalized === "notgiven") return "not given";
    return "";
}

function normalizeLetterSet(value) {
    return Array.from(new Set(String(value || "").toUpperCase().match(/[A-I]/g) || [])).sort().join("");
}

async function saveFullMockWritingToSheet(payload) {
    if (!FULL_MOCK_WRITING_SHEET_WEBHOOK) return;

    try {
        await fetch(FULL_MOCK_WRITING_SHEET_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apiKey: FULL_MOCK_WRITING_SHEET_KEY,
                ...payload
            })
        });
    } catch (error) {
        console.error("Failed to save full mock writing to Google Sheet:", error);
    }
}

function isReadingQuestionCorrect(questionNumber) {
    const input = document.getElementById(`rq${questionNumber}`);
    if (!input) return false;

    const raw = input.value || "";
    const expected = FULL_MOCK_READING_ANSWER_KEY[questionNumber];
    if (!expected) return false;

    if (Array.isArray(expected)) {
        return normalizeLetterSet(raw) === expected.slice().sort().join("");
    }

    if ([8, 9, 10, 20, 21, 22].includes(questionNumber)) {
        return normalizeTrueFalseNotGiven(raw) === expected;
    }

    if (questionNumber >= 14 && questionNumber <= 40) {
        return normalizeLetterSet(raw) === String(expected).toUpperCase();
    }

    return normalizeReadingText(raw) === normalizeReadingText(expected);
}

function countCorrectReadingQuestions() {
    let correct = 0;
    for (let question = 1; question <= 40; question += 1) {
        if (isReadingQuestionCorrect(question)) {
            correct += 1;
        }
    }
    return correct;
}

function enforceCheckboxLimit(groupName, limit) {
    const checked = Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`));
    if (checked.length <= limit) {
        return;
    }

    checked[checked.length - 1].checked = false;
}

async function requestExamFullscreen() {
    if (document.fullscreenElement) {
        return;
    }

    if (!document.documentElement.requestFullscreen) {
        return;
    }

    try {
        await document.documentElement.requestFullscreen();
    } catch {
    }
}

function pauseListeningAudio() {
    if (!elements.mockAudio) {
        return;
    }

    elements.mockAudio.pause();
}

function tryPlayListeningAudio() {
    if (!FULL_MOCK_CONFIG.audioSrc || currentSectionId() !== "listening") {
        return;
    }

    if (elements.mockAudio.classList.contains("hidden")) {
        return;
    }

    elements.mockAudio.play().catch(() => {});
}

function setupSecurityGuards() {
    document.addEventListener("fullscreenchange", () => {
        if (!state.started || state.finished) {
            return;
        }

        if (document.fullscreenElement) {
            if (state.paused && !elements.sectionModal.classList.contains("hidden")) {
                return;
            }

            if (state.paused && !elements.lockdownOverlay.classList.contains("hidden")) {
                state.paused = false;
                saveState();
                hideOverlay(elements.lockdownOverlay);
                if (currentSectionId() === "listening") {
                    tryPlayListeningAudio();
                }
                startTimer();
            }
            return;
        }

        registerViolation("Fullscreen was closed.");
    });

    document.addEventListener("visibilitychange", () => {
        if (!state.started || state.finished) {
            return;
        }

        if (document.hidden) {
            registerViolation("You left the exam window.");
        }
    });

    window.addEventListener("blur", () => {
        if (!state.started || state.finished) {
            return;
        }

        if (document.visibilityState === "visible") {
            registerViolation("The exam window lost focus.");
        }
    });

    document.addEventListener("contextmenu", (event) => {
        if (state.started && !state.finished) {
            event.preventDefault();
        }
    });

    ["copy", "cut", "paste"].forEach((eventName) => {
        document.addEventListener(eventName, (event) => {
            if (state.started && !state.finished) {
                event.preventDefault();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (!state.started || state.finished) {
            return;
        }

        const key = event.key.toLowerCase();
        const blocked =
            event.key === "F12" ||
            event.key === "Escape" ||
            (event.ctrlKey && ["u", "p", "s", "a", "c", "v", "x"].includes(key)) ||
            (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key));

        if (blocked) {
            event.preventDefault();
        }
    });

    window.addEventListener("beforeunload", (event) => {
        if (!state.started || state.finished) {
            return;
        }

        event.preventDefault();
        event.returnValue = "";
    });
}

function registerViolation(message) {
    if (!state.started || state.finished) {
        return;
    }

    if (!elements.sectionModal.classList.contains("hidden")) {
        return;
    }

    const now = Date.now();
    if (now - state.lastViolationAt < 1200) {
        return;
    }

    state.lastViolationAt = now;
    state.violationCount += 1;
    state.paused = true;
    saveState();
    renderViolationCounter();
    stopTimer();
    pauseListeningAudio();

    if (state.violationCount >= FULL_MOCK_CONFIG.maxViolations) {
        finishDueToViolation();
        return;
    }

    elements.lockdownMessage.textContent = `${message} Warning ${state.violationCount}/${FULL_MOCK_CONFIG.maxViolations}.`;
    showOverlay(elements.lockdownOverlay);
}

function finishDueToViolation() {
    state.finished = true;
    saveState();
    showSectionModal(
    "Full mock ended",
    "The exam was ended because the fullscreen or window rules were broken too many times.",
    "Return to Dashboard",
    () => {
        clearSharedSessionKeys();
        resetState();
        restoreAllSavedInputs();
        window.location.href = FULL_MOCK_CONFIG.paths.dashboardPage;
    }
);

}

async function resumeExamFromOverlay() {
    await requestExamFullscreen();

    if (!document.fullscreenElement) {
        return;
    }

    state.paused = false;
    saveState();
    hideOverlay(elements.lockdownOverlay);
    startTimer();

    if (currentSectionId() === "listening") {
        tryPlayListeningAudio();
    }
}

function setSharedSessionKeys(candidateName) {
    localStorage.setItem("fullMockMode", "true");
    localStorage.setItem("fullMockTestNumber", "1");
    localStorage.setItem("fullMockCandidateName", candidateName);
    localStorage.setItem("fullMockStage", currentSectionId());
    localStorage.setItem("activeCandidateName", candidateName);
    localStorage.setItem("listeningCandidateName", candidateName);
    localStorage.setItem("readingCandidateName", candidateName);
    localStorage.setItem("writingCandidateName", candidateName);
}

function updateSharedStageKey() {
    localStorage.setItem("fullMockStage", currentSectionId());
}

function clearSharedSessionKeys() {
    [
        "fullMockMode",
        "fullMockTestNumber",
        "fullMockCandidateName",
        "fullMockStage",
        "activeCandidateName",
        "listeningCandidateName",
        "readingCandidateName",
        "writingCandidateName"
    ].forEach((key) => localStorage.removeItem(key));
}
