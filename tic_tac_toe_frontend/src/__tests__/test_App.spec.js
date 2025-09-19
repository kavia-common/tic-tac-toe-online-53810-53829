import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Tests focus on available UI behavior: theme toggling and rendering.
// These tests use React Testing Library to validate user-centric outcomes.

describe('App component', () => {
  test('renders header content and Learn React link', () => {
    render(<App />);
    // Smoke: core UI present
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Learn React/i })).toBeInTheDocument();
    // Theme indicator text
    expect(screen.getByText(/Current theme:/i)).toBeInTheDocument();
    // Theme toggle button exists and has correct initial label and aria-label
    const toggleBtn = screen.getByRole('button', { name: /Switch to dark mode/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveTextContent('Dark');
  });

  test('applies data-theme to document element and toggles between light and dark', () => {
    render(<App />);

    // Initially theme should be light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(screen.getByText(/Current theme:/i).nextSibling).toHaveTextContent('light');

    // Toggle to dark
    const toggleBtn = screen.getByRole('button', { name: /Switch to dark mode/i });
    fireEvent.click(toggleBtn);

    // After toggle, document data-theme should be dark
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    // UI should update to show dark
    expect(screen.getByText(/Current theme:/i).nextSibling).toHaveTextContent('dark');

    // Button aria-label updates to "Switch to light mode" and text shows Light
    expect(
      screen.getByRole('button', { name: /Switch to light mode/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Light');

    // Toggle back to light
    fireEvent.click(screen.getByRole('button', { name: /Switch to light mode/i }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(screen.getByText(/Current theme:/i).nextSibling).toHaveTextContent('light');
    expect(screen.getByRole('button', { name: /Switch to dark mode/i })).toBeInTheDocument();
  });

  test('toggle button is accessible with aria-label describing the action', () => {
    render(<App />);
    // Button should describe the action it will perform (switch to dark)
    const toggleBtn = screen.getByRole('button', { name: /Switch to dark mode/i });
    expect(toggleBtn).toHaveAttribute('aria-label', expect.stringMatching(/Switch to dark mode/i));
    fireEvent.click(toggleBtn);
    // Now should describe switching back to light
    const toggleBtnLight = screen.getByRole('button', { name: /Switch to light mode/i });
    expect(toggleBtnLight).toHaveAttribute('aria-label', expect.stringMatching(/Switch to light mode/i));
  });
});
