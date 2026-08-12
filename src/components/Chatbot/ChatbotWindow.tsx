import { motion } from 'framer-motion';
import { Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { BUSINESS_INFO } from '../../config/businessInfo';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: string[];
}

interface ChatbotWindowProps {
  isOpen: boolean;
}

const { phone, phoneRaw, email } = BUSINESS_INFO.contact;

const quickReplies = ['Get a price', 'What you do', 'Do you cover me?', 'When can you come?'];

const botResponses: Record<string, { text: string; options?: string[] }> = {
  greeting: {
    text: `Hi — A1 Paving here. Ask away, or call ${phone} if you'd rather just talk it through.`,
    options: quickReplies,
  },
  quote: {
    text: `Pricing comes down to square footage and the condition of the surface, so every quote gets measured on site — no charge for that.\n\nQuickest route: call or text ${phone} with the property address. A photo of the surface helps a lot.\n\nWhat are we looking at?`,
    options: ['Residential driveway', 'Commercial or industrial', 'Tar and chip', 'Do you cover me?'],
  },
  services: {
    text: 'Anything that involves asphalt:\n\n• Asphalt paving, residential to industrial\n• Tar and chip surfacing\n• Parking lot paving\n• Resurfacing and overlays\n• Sealcoating\n• Milling\n• Gravel driveways, farm lanes and private roads\n\nWhich one matters for you?',
    options: ['Residential driveway', 'Commercial or industrial', 'Tar and chip', 'Get a price'],
  },
  areas: {
    text: `We work about a ${BUSINESS_INFO.serviceArea.radius}-mile radius of Grand Rapids, and will travel up to ${BUSINESS_INFO.serviceArea.maxTravel} miles for the right job.\n\nKent County: Grand Rapids, Wyoming, Kentwood, Grandville, Walker, Rockford, Ada, Lowell, Caledonia, Byron Center, Cedar Springs\nOttawa County: Hudsonville, Jenison, Holland, Zeeland, Allendale\nAlso: Greenville, Ionia\n\nNot on the list? Call ${phone} — the radius is a guide, not a fence.`,
    options: ['Get a price', 'When can you come?', 'Contact info'],
  },
  residential: {
    text: 'For driveways the ground gets prepped, a compacted stone base goes down, then hot mix asphalt on top.\n\nOn longer rural drives, tar and chip is often the better value per foot.\n\nWant a measured price?',
    options: ['Get a price', 'When can you come?', 'What you do'],
  },
  commercial: {
    text: 'For lots we can phase the work by section so you never lose the whole parking area at once, and stalls, arrows and ADA markings go down once the surface is ready.\n\nRetail, office, multifamily and industrial — all normal for us. Industrial yards get a deeper base for the loading.',
    options: ['Get a price', 'When can you come?', 'Contact info'],
  },
  cracks: {
    text: 'Crack filling and patching on their own is fine — you do not have to seal the whole surface to get the cracks handled.\n\nWorth knowing: cracks are how water reaches the base, and that is what actually destroys asphalt. Getting them closed is the highest-value thing you can do.',
    options: ['Get a price', 'What you do', 'Contact info'],
  },
  timing: {
    text: `Season here runs ${BUSINESS_INFO.season}. Sealer needs dry pavement and warm enough surface temperatures to cure properly, so we watch the forecast and will move a date rather than coat ahead of rain.\n\nCall ${phone} and we will tell you what the schedule actually looks like this week.`,
    options: ['Get a price', 'Do you cover me?', 'Contact info'],
  },
  contact: {
    text: `Call or text: ${phone}\nEmail: ${email}\nBased: ${BUSINESS_INFO.address.streetAddress}, ${BUSINESS_INFO.address.addressLocality}, ${BUSINESS_INFO.address.addressRegion} ${BUSINESS_INFO.address.postalCode}\nHours: Mon–Fri 7–6, Sat 8–4\n\nAnything else?`,
    options: quickReplies,
  },
  default: {
    text: `Happy to help with pricing, what is involved, whether we cover your area, or timing. For anything specific, calling ${phone} is fastest.`,
    options: quickReplies,
  },
};

function matchResponse(message: string) {
  const m = message.toLowerCase();

  if (/(cover me|my area|service area|where do you|do you come|areas)/.test(m)) return botResponses.areas;
  if (/(when|schedule|how soon|season|book|availab|timing|weather)/.test(m)) return botResponses.timing;
  if (/(crack|pothole|patch)/.test(m)) return botResponses.cracks;
  if (/(commercial|parking lot|lot|business|hoa|apartment|multifamily|strip)/.test(m)) return botResponses.commercial;
  if (/(residential|driveway|home|house)/.test(m)) return botResponses.residential;
  if (/(price|quote|cost|estimate|how much|\$)/.test(m)) return botResponses.quote;
  if (/(contact|phone|email|call|text|number|address)/.test(m)) return botResponses.contact;
  if (/(service|what do you|what you do|offer|stripe|striping|seal)/.test(m)) return botResponses.services;

  return botResponses.default;
}

export default function ChatbotWindow({ isOpen }: ChatbotWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: botResponses.greeting.text, sender: 'bot', options: botResponses.greeting.options },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = (text ?? inputValue).trim();
    if (!messageText) return;

    setMessages((prev) => [
      ...prev,
      { id: `u${Date.now()}`, text: messageText, sender: 'user' },
    ]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = matchResponse(messageText);
      setMessages((prev) => [
        ...prev,
        { id: `b${Date.now()}`, text: response.text, sender: 'bot', options: response.options },
      ]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-4 md:right-6 z-40 w-[calc(100vw-2rem)] md:w-[400px] h-[520px] md:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
      style={{ maxWidth: '400px' }}
      role="dialog"
      aria-label="Chat with A1 Paving"
    >
      <div className="bg-charcoal-950 text-white p-4 flex items-center gap-3 rounded-t-2xl">
        <img src="/logo-mark.svg" alt="" width="40" height="40" className="w-10 h-10 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-bold text-base">A1 Paving</h3>
          <div className="flex items-center gap-2 text-xs text-charcoal-300">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span>Quick answers &middot; call for a real quote</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-charcoal-50">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[85%]">
              <div
                className={`p-3 whitespace-pre-wrap rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : 'bg-white text-charcoal-900 border border-gray-200 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              {message.options && message.options.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSendMessage(option)}
                      className="block w-full text-left text-sm px-3 py-2 bg-white hover:bg-primary-50 text-charcoal-700 hover:text-primary-600 border border-gray-200 hover:border-primary-300 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-3 shadow-sm">
              <div className="flex gap-1">
                {[0, 0.1, 0.2].map((delay) => (
                  <motion.div
                    key={delay}
                    className="w-2 h-2 bg-charcoal-400 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 p-4 rounded-b-2xl">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <a
            href={`tel:${phoneRaw}`}
            className="flex items-center justify-center gap-2 px-3 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md text-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>
          <a
            href={`sms:${phoneRaw}`}
            className="flex items-center justify-center gap-2 px-3 py-3 bg-charcoal-950 hover:bg-charcoal-900 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Text</span>
          </a>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question…"
            aria-label="Type your question"
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm rounded-xl transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            aria-label="Send message"
            className="w-11 h-11 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
          <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-primary-500">
            <Mail className="w-3 h-3" />
            <span>{email}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
