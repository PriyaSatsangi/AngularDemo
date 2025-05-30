import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  file1Content: string = '';
  file2Content: string = '';

  matchedLines: string[] = [];
  unmatchedLines: string[] = [];
  displayMode: 'match' | 'unmatch' | null = null;

  handleFileInput(event: any, fileNumber: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = (reader.result as string).split(/\r?\n/).map(line => line.trim()).filter(line => line);
        if (fileNumber === 1) {
          this.file1Content = content.join('\n');
        } else if (fileNumber === 2) {
          this.file2Content = content.join('\n');
        }

        // Clear previous results
        this.displayMode = null;
        this.matchedLines = [];
        this.unmatchedLines = [];
      };
      reader.readAsText(file);
    }
  }

  compareFiles(): void {
    const lines1 = this.file1Content.split(/\r?\n/).map(line => line.trim());
    const lines2 = this.file2Content.split(/\r?\n/).map(line => line.trim());

    const set1 = new Set(lines1);
    const set2 = new Set(lines2);

    this.matchedLines = lines1.filter(line => set2.has(line));
    this.unmatchedLines = [
      ...lines1.filter(line => !set2.has(line)),
      ...lines2.filter(line => !set1.has(line))
    ];
  }

  showMatched(): void {
    this.compareFiles();
    this.displayMode = 'match';
  }

  showUnmatched(): void {
    this.compareFiles();
    this.displayMode = 'unmatch';
  }
}
