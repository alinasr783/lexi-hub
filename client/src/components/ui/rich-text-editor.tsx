import { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Quote,
  Image as ImageIcon,
  Link,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  label = "المحتوى",
  placeholder = "اكتب المحتوى هنا...",
  className,
  minHeight = "400px"
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertImage = (imageUrl: string) => {
    if (selectedRange) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }
    }
    
    execCommand('insertHTML', `<img src="${imageUrl}" alt="صورة" style="max-width: 100%; height: auto; margin: 10px 0;" />`);
    setShowImageUpload(false);
    setSelectedRange(null);
  };

  const insertLink = () => {
    const url = prompt('أدخل رابط الصفحة:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSelectedRange(selection.getRangeAt(0));
    }
  };

  const formatButtons = [
    { command: 'bold', icon: Bold, title: 'عريض' },
    { command: 'italic', icon: Italic, title: 'مائل' },
    { command: 'underline', icon: Underline, title: 'تحته خط' },
    { command: 'formatBlock', value: 'h1', icon: Heading1, title: 'عنوان كبير' },
    { command: 'formatBlock', value: 'h2', icon: Heading2, title: 'عنوان متوسط' },
    { command: 'insertUnorderedList', icon: List, title: 'قائمة نقطية' },
    { command: 'insertOrderedList', icon: ListOrdered, title: 'قائمة مرقمة' },
    { command: 'formatBlock', value: 'blockquote', icon: Quote, title: 'اقتباس' },
    { command: 'formatBlock', value: 'pre', icon: Code, title: 'كود' },
    { command: 'justifyLeft', icon: AlignLeft, title: 'محاذاة يسار' },
    { command: 'justifyCenter', icon: AlignCenter, title: 'محاذاة وسط' },
    { command: 'justifyRight', icon: AlignRight, title: 'محاذاة يمين' },
  ];

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      
      {/* Toolbar */}
      <div className="border rounded-t-lg p-2 bg-muted/30">
        <div className="flex flex-wrap gap-1">
          {formatButtons.map((button) => (
            <Button
              key={button.command + (button.value || '')}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => execCommand(button.command, button.value)}
              title={button.title}
              className="h-8 w-8 p-0"
            >
              <button.icon className="w-4 h-4" />
            </Button>
          ))}
          
          <div className="w-px h-6 bg-border mx-1" />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              saveSelection();
              setShowImageUpload(true);
            }}
            title="إدراج صورة"
            className="h-8 w-8 p-0"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertLink}
            title="إدراج رابط"
            className="h-8 w-8 p-0"
          >
            <Link className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className={cn(
          "border border-t-0 rounded-b-lg p-4 min-h-[400px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "prose prose-slate max-w-none",
          "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4",
          "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3",
          "[&_p]:mb-3 [&_p]:leading-relaxed",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-muted/50 [&_blockquote]:py-2",
          "[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:text-sm",
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3",
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3",
          "[&_li]:mb-1",
          "[&_img]:rounded [&_img]:shadow-sm",
          "[&_a]:text-primary [&_a]:underline"
        )}
        style={{ minHeight }}
        data-placeholder={placeholder}
      />

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">إدراج صورة</h3>
            <ImageUpload
              value=""
              onChange={insertImage}
              bucket="article-images"
              folder="content"
              label="اختر الصورة"
            />
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowImageUpload(false)}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { RichTextEditor };